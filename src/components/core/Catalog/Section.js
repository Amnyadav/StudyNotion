import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { LuFileVideo } from "react-icons/lu";
const Section = ({ sectionData, isActive }) => {
  const dropdown = useRef();
  const [clicked, setclicked] = useState(false);
  const clickHandler = () => {
    setclicked(!clicked);
    if (clicked) {
      dropdown.current.style.display = "block";
    } else {
      dropdown.current.style.display = "none";
    }
  };
  useEffect(()=>{
    clickHandler();
  },[]);
  return (
    <>
      <div
        className="bg-richblack-700 border border-richblack-500 text-richblack-5 p-4 flex justify-between cursor-pointer"
        onClick={clickHandler}
      >
        <div className="flex gap-2 items-center">
          {clicked ? (
            <MdOutlineKeyboardArrowUp className="text-3xl"></MdOutlineKeyboardArrowUp>
          ) : (
            <MdKeyboardArrowDown className="text-3xl"></MdKeyboardArrowDown>
          )}
          <p className="text-lg">{sectionData.sectionName}</p>
        </div>
        <p className="text-yellow-25 text-base">
          {sectionData.subSection.length} Lecture(s)
        </p>
      </div>
      <div
        className="bg-richblack-900 border hidden border-richblack-600 transition-all duration-200 "
        ref={dropdown}
      >
        {
          <div className="p-5 flex flex-col gap-2">
            { sectionData?.subSection.length>0 ? sectionData?.subSection?.map((lec) => {
              return (
                <div
                  key={lec._id}
                  className="text-richblack-5 flex gap-2 items-center text-lg font-bold"
                >
                  <LuFileVideo></LuFileVideo>
                  {lec.title}
                </div>
              );
            }):<p>lectures available soon </p>}
          </div>
        }
      </div>
    </>
  );
};

export default Section;
