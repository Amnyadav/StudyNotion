import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import categoryPageData from "../services/operations/categoryPageData";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { useState } from "react";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Footer from "../components/Footer/Footer";
import Course_Card from "../components/core/Catalog/Course_Card";
const Catalog = () => {
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [catalogPageData, setCatalogPageData] = useState(null);
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      console.log(res.data.data);
      const categoryId = res?.data?.data.filter(
        (cat) => cat.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(categoryId);
      //   console.log(categoryId);
    };
    getCategories();
  }, [catalogName]);
  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const res = await categoryPageData(categoryId);
        console.log("category data", res.data);
        setCatalogPageData(res?.data);
      } catch (e) {
        console.log("error", e);
      }
    };
    getCategoriesData();
  }, [categoryId]);

  // console.log("coursesssssssssss", catalogPageData?.selectedCategory?.courses);
  return (
    <div className="w-full bg-richblack-800">
      <div className="w-10/12 max-w-maxContent mx-auto flex flex-col">
        {/* section 1 */}
        <div className="my-8 lg:my-0 flex justify-between">
          <div className="max-w-maxContentTab lg:max-w-maxContent flex flex-col justify-center gap-4 lg:min-h-[240px]">
            <p className="text-richblack-300 text-sm">
              Home / Catalog /
              <span className="text-sm text-yellow-25">
                {`  ${catalogPageData?.selectedCategory.name}`}
              </span>
            </p>
            <p className="text-3xl text-richblack-5">
              {catalogPageData?.selectedCategory.name}
            </p>
            <p className="text-sm text-richblack-300">
              {catalogPageData?.selectedCategory.description}
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <div className="w-full bg-richblack-900 py-8">
        <div className="w-10/12 max-w-maxContent mx-auto flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-3xl text-richblack-5">
              Courses to get you started
            </p>
            <div className="flex gap-5 border-b border-b-richblack-600 text-richblack-300 text-sm  ">
              <p
                className={`h-full cursor-pointer py-1 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-300"
                }`}
                onClick={() => {
                  setActive(1);
                }}
              >
                Most Popular
              </p>
              <p
                className={`h-full py-1 cursor-pointer ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-300"
                }`}
                onClick={() => {
                  setActive(2);
                }}
              >
                New
              </p>
              <p
                className={`h-full py-1 cursor-pointer ${
                  active === 3
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-300"
                }`}
                onClick={() => {
                  setActive(3);
                }}
              >
                Trending
              </p>
            </div>
            <div className="py-6">
              <CourseSlider
                courses={catalogPageData?.selectedCategory?.courses || []}
              ></CourseSlider>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl text-richblack-5">
              {`Top Courses In ${catalogPageData?.differentCategory?.name}`}
            </p>
            <div className="flex gap-5 border-b border-b-richblack-600 text-richblack-300 text-sm  ">
              <p
                className={`h-full cursor-pointer py-1 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-300"
                }`}
                onClick={() => {
                  setActive(1);
                }}
              >
                Most Popular
              </p>
              <p
                className={`h-full py-1 cursor-pointer ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-300"
                }`}
                onClick={() => {
                  setActive(2);
                }}
              >
                New
              </p>
              <p
                className={`h-full py-1 cursor-pointer ${
                  active === 3
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-300"
                }`}
                onClick={() => {
                  setActive(3);
                }}
              >
                Trending
              </p>
            </div>
            <div className="py-6">
              <CourseSlider
                courses={catalogPageData?.differentCategory?.courses || []}
              ></CourseSlider>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-3xl text-richblack-5">Frequently Bought</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {catalogPageData?.mostSellingCourses?.map((course, index) => (
                <Course_Card key={index} course={course} height={'h-[400px]'}></Course_Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Catalog;
