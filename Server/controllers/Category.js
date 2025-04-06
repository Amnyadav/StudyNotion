const Category = require("../models/Category");
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    // create entry in db
    const CategoryDetails = await Category.create({ name, description });
    return res.status(200).json({
      success: true,
      message: "entry created successfully in db of Categoriess....",
      data: CategoryDetails,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error while crating entry of Category in db",
    });
  }
};
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({}).populate("courses").exec();

    console.log("user in cat", req.user);
    return res.status(200).json({
      success: true,
      message: "fetch all Categories succesfully",
      data: allCategories,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error while fetching all Categories...",
    });
  }
};

// exports.categoriesPageDetails = async (req, res) => {
//   try {
//     const { categoryId } = req.body;

//     const selectedCategory = await Category.findById(categoryId)
//       .populate("courses")
//       .exec();
//     if (!selectedCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "no data or courses found related to selected category",
//       });
//     }
//     // courses of other categories
//     const diffCategory = await Category.findById({ _id: { $ne: categoryId } })
//       .populate("courses")
//       .exec();

//     // top selling coureses

//     return res.status(200).json({
//       success: true,
//       message: "other category courses fetch successfully",
//       selectedCategory: selectedCategory,
//       diffCategory,
//     });
//   } catch (e) {
//     return res.status(500).json({
//       success: false,
//       message: "error while fetching categoryPageDetails",
//     });
//   }
// };
exports.categoriesPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("PRINTING CATEGORY ID: ", categoryId);
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        // populate: "ratingAndReviews",
        populate:{
          path:'instructor'
        }
      })
      .exec();
    console.log("category selected");
    //console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    //console.log("Different COURSE", differentCategory)
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    // console.log("mostSellingCourses COURSE", mostSellingCourses);
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
