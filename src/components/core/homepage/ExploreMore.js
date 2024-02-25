import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";
const tabs = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0]);
  function setMyCards(value) {
    setCurrentTab(value);
    const result = HomePageExplore.filter((item) => item.tag === value);
    // console.log(result);
    setCourses(result[0].courses);
    // console.log(result.courses);
    setCurrentCard(result[0].courses[0]);
  }
  return (
    <div className="flex flex-col gap-9 items-center">
      <div className="flex flex-col gap-2">
        <div className="text-4xl text-center font-semibold font-inter text-richblack-5">
          Unlock the <HighlightText text={"Power of code"}></HighlightText>
        </div>
        <p className="text-center text-richblack-300 text-lg font-bold">
          Learn to Build Anything You Can Imagine
        </p>
      </div>
      <div className="tabs hidden  mb-48  lg:flex gap-4 bg-richblack-800 rounded-full px-1 py-1">
        {tabs?.map((element, index) => {
          return (
            <div
              className={` flex justify-center items-center text-base font-medium text-richblack-300 hover:bg-richblack-900  hover:text-richblack-5 cursor-pointer rounded-full px-7 py-2 ${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5"
                  : ""
              } `}
              key={index}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      <div className=" lg:absolute lg:translate-y-[55%] flex flex-wrap lg:flex-nowrap justify-center  gap-9  lg:pt-8 ">
        {courses.map((course, index) => {
          return (
            <div key={index} className="cursor-pointer lg:w-[30%] x:w-[300px] w-[270px] ">
              <CourseCard
                course={course}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
                onClick={() => setCurrentCard(course)}
              ></CourseCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
