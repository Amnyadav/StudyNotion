const Course = require("../models/Course");
const Section = require("../models/Section");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }
    const section = await Section.create({
      sectionName,
    });
    const updateCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: { courseContent: section._id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "section created succesfully..",
      data: section,
      updatedCourse: updateCourse,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "error while creating a section.",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, sectionId } = req.body;
    // validation
    if (!sectionName || !sectionId) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }
    //update
    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "section updated succesfully",
      updatedSection: updateSection,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error while updating a section.",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { courseId } = req.body;
    const sectionId = req.body.sectionId;
    await Section.findByIdAndDelete(sectionId);
    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "section deleted succesfully",
      updatedCourse: updateCourse,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error while deleting a section.",
    });
  }
};
