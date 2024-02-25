import React, { lazy } from "react";
import frameImage from "../../../assets/Images/frame.png";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { FcGoogle } from "react-icons/fc";
const Template = ({ title, desc1, desc2, image, formtype, setIsLoggedIn }) => {
  return (
    <div className="w-11/12 max-w-[1160px] mx-auto flex py-12 gap-x-12 space-y-0 justify-between  ">
      {/* left */}
      <div className="w-11/12 max-w-[450px]">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem]  leading[2.375rem] ">
          {title}
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] text-richblack-100 mt-4 ">
          {desc1}
        </p>
        <p className="text-[1.125rem] leading-[1.625rem] text-blue-100 italic">
          {desc2}
        </p>
        {formtype === "signup" ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn}></SignupForm>
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn}></LoginForm>
        )}
        <div className="flex w-full items-center my-4 ">
          <div className="bg-richblack-700 w-full h-[1px]"></div>
          <p className="text-richblack-700 font-medium leading-[1.375rem] mx-2  ">
            OR
          </p>
          <div className="bg-richblack-700 w-full h-[1px]"></div>
        </div>
        <button className="text-richblack-100 flex items-center justify-center w-full gap-2   font-medium rounded-md border border-richblack-100 px-[12px] py-[8px] mt-6 ">
          <FcGoogle /> sign in with google
        </button>
      </div>
      {/* right */}
      <div className=" flex flex-col relative w-11/12 max-w-[450px]">
        <img src={frameImage} width={558} height={504} className=" " loading='lazy'></img>
        <img src={image} width={558} height={490} className="absolute right-4 -top-4 " loading='lazy'></img>
      </div>
    </div>
  );
};

export default Template;
