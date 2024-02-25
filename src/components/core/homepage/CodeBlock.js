import React from "react";
import CTAbutton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { IoMdArrowForward } from "react-icons/io";
// background: linear-gradient(to bottom,  rgba(70,186,219,1) 48%,rgba(68,234,217,1) 100%);
const CodeBlock = ({
  position,
  heading,
  subhead,
  ctaBtn1,
  ctaBtn2,
  code,
  codeColor,
  bgGradient,
}) => {
  console.log(ctaBtn1);
  return (
    <div className={`flex ${position} flex-col justify-between my-20 gap-10`}>
      {/* Left box */}
      <div className="flex flex-col lg:w-[50%] w-full gap-8 ">
        <p className={`text-4xl font-semibold`}>{heading}</p>
        <p className="w-[85%] text-richblack-300 font-bold -mt-4">{subhead}</p>
        <div className="flex gap-7 mt-7">
          <CTAbutton active={ctaBtn1.active} linkto={ctaBtn1.linkto}>
            <div className="flex items-center gap-2">
              {ctaBtn1.btnText}
              <IoMdArrowForward className="text-lg font-bold" />
            </div>
          </CTAbutton>
          <CTAbutton active={ctaBtn2.active} linkto={ctaBtn2.linkto}>
            {ctaBtn2.btnText}
          </CTAbutton>
        </div>
      </div>
      {/* right box */}
      <div className="backdrop-filter-[5px] w-[100%] lg:w-[500px] h-fit flex  gap-1 border-2 border-[#ffffff5f]  p-3  font-bold  relative bg-transparent backdrop-blur-sm">
        <div
          className={`${
            position == "lg:flex-row" ? "orange circle " : "blue circle"
          } rounded-full opacity-20`}
        ></div>
        <div className="w-fit text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div
          className={`w-[90%]   ${codeColor} relative flex flex-col font-bold  font-mono`}
        >
          <TypeAnimation
            sequence={[code,0,""]}
            cursor={true}
            repeat={Infinity}
            speed={20}
            omitDeletionAnimation={true}
            style={{
              display: "block",
              whiteSpace: "pre-line",
            }}
          ></TypeAnimation>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
