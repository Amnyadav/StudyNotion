import React from "react";
import user from "../../../assets/exploreIcons/users.svg";
import node from "../../../assets/exploreIcons/node.svg";
const CourseCard = ({ course, currentCard, setCurrentCard }) => {
  return (
    <div
      onClick={() => setCurrentCard(course)}
      className={`${
        currentCard === course
          ? "currentCard-shadow bg-richblack-5 "
          : "bg-richblack-800"
      } h-full flex flex-col`}
    >
      <div className={`p-6  flex flex-col gap-3 h-[250px]`}>
        <p
          className={`${
            currentCard === course ? "text-richblack-900" : "text-richblack-5"
          } text-xl font-inter font-semibold`}
        >
          {course.heading}
        </p>
        <p
          className={`${
            currentCard === course ? "text-richblack-500" : ""
          }  text-base tracking-wide font-normal text-richblack-400  `}
        >
          {course.description}
        </p>
      </div>
      <div
        className={`${
          currentCard === course ? "text-blue-500" : "text-richblack-300"
        } flex justify-between text-base py-4 px-6 border-t border-richblack-600 border-dashed`}
      >
        <div className="flex gap-2">
          {currentCard === course ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7 8C8.65685 8 10 6.65685 10 5C10 3.34315 8.65685 2 7 2C5.34315 2 4 3.34315 4 5C4 6.65685 5.34315 8 7 8Z"
                fill="#0F7A9D"
              />
              <path
                d="M14.5 9C15.8807 9 17 7.88071 17 6.5C17 5.11929 15.8807 4 14.5 4C13.1193 4 12 5.11929 12 6.5C12 7.88071 13.1193 9 14.5 9Z"
                fill="#0F7A9D"
              />
              <path
                d="M1.61528 16.428C1.21798 16.1736 0.987847 15.721 1.04605 15.2529C1.41416 12.292 3.93944 10 6.9999 10C10.0604 10 12.5856 12.2914 12.9537 15.2522C13.012 15.7203 12.7818 16.1729 12.3845 16.4273C10.8302 17.4225 8.98243 18 6.9999 18C5.01737 18 3.16959 17.4231 1.61528 16.428Z"
                fill="#0F7A9D"
              />
              <path
                d="M14.5001 16C14.4647 16 14.4295 15.9998 14.3943 15.9993C14.4631 15.7025 14.4822 15.3885 14.4423 15.0671C14.2668 13.6562 13.7001 12.367 12.854 11.3116C13.3646 11.1105 13.9208 11 14.5028 11C16.4426 11 18.0956 12.2273 18.7279 13.9478C18.8638 14.3176 18.7045 14.7241 18.3671 14.9275C17.2379 15.6083 15.9147 16 14.5001 16Z"
                fill="#0F7A9D"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M7.33398 8C8.99084 8 10.334 6.65685 10.334 5C10.334 3.34315 8.99084 2 7.33398 2C5.67713 2 4.33398 3.34315 4.33398 5C4.33398 6.65685 5.67713 8 7.33398 8Z"
                fill="#6E727F"
              />
              <path
                d="M14.834 9C16.2147 9 17.334 7.88071 17.334 6.5C17.334 5.11929 16.2147 4 14.834 4C13.4533 4 12.334 5.11929 12.334 6.5C12.334 7.88071 13.4533 9 14.834 9Z"
                fill="#6E727F"
              />
              <path
                d="M1.94926 16.428C1.55196 16.1736 1.32183 15.721 1.38003 15.2529C1.74814 12.292 4.27342 10 7.33388 10C10.3943 10 12.9196 12.2914 13.2877 15.2522C13.3459 15.7203 13.1158 16.1729 12.7185 16.4273C11.1642 17.4225 9.31642 18 7.33388 18C5.35136 18 3.50357 17.4231 1.94926 16.428Z"
                fill="#6E727F"
              />
              <path
                d="M14.834 16C14.7987 16 14.7635 15.9998 14.7283 15.9993C14.7971 15.7025 14.8162 15.3885 14.7762 15.0671C14.6008 13.6562 14.0341 12.367 13.188 11.3116C13.6986 11.1105 14.2548 11 14.8368 11C16.7765 11 18.4296 12.2273 19.0619 13.9478C19.1978 14.3176 19.0385 14.7241 18.7011 14.9275C17.5719 15.6083 16.2487 16 14.834 16Z"
                fill="#6E727F"
              />
            </svg>
          )}
          <p>{course.level}</p>
        </div>
        <div className="flex gap-1">
          <img src={node}></img>
          <div className="flex gap-1">
          <p>{course.lessionNumber}</p>
          <p>Lesson</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
