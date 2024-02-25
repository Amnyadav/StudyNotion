import React, { lazy } from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { RiGoogleLine } from "react-icons/ri";
import { CiFacebook } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links";
import Col from "./Col";

const Footer = () => {
  return (
    <div>
      <div className="w-11/12 max-w-maxContent mx-auto text-white flex lg:flex-row lg:flex-nowrap flex-wrap gap-14">
        {/* left */}
        <div className="flex lg:flex-nowrap flex-wrap w-full self-stretch gap-3 items-start">
          <div className="flex flex-col lg:w-full w-[40%]  gap-3">
            <div>
              <img src={Logo} className="w-40 pr-2" loading={lazy}></img>
            </div>
            <div className="text-richblack-100 font-semibold font-inter leading-6 text-base self-stretch">
              Company
            </div>
            <div className="text-richblack-400 text-sm flex flex-col gap-2 leading-5 font-inter font-normal">
              <p className="self-stretch">Careeres</p>
              <p>About</p>
              <p>Affiliates</p>
            </div>
            <div className="flex gap-3">
              <RiGoogleLine className="w-6 h-6 bg-richblack-400 rounded-full text-richblack-800" />
              <CiFacebook className="w-6 h-6 bg-richblack-400 rounded-full text-richblack-800" />
              <FaTwitter className="w-6 h-6 rounded-full text-richblack-400" />
              <FaYoutube className="w-6 h-6  rounded-full text-richblack-400" />
            </div>
          </div>
          <div className="flex flex-col lg:w-full w-[40%] gap-3">
            <div className="text-richblack-100  text-base font-semibold font-inter leading-6">
              Resources
            </div>
            <div className="text-richblack-400 text-sm flex flex-col gap-2 leading-5 font-inter font-normal">
              <p>Article</p>
              <p>Blog</p>
              <p>Chart Sheet</p>
              <p>Code Challenges</p>
              <p>Docs</p>
              <p>Projects</p>
              <p>Videos</p>
              <p>Workspace</p>
              <div className="flex flex-col gap-3">
                <p className="text-richblack-100  text-base font-semibold font-inter leading-6">
                  Support
                </p>
                <p className="text-richblack-400 text-sm">Help center</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:w-full w-[40%] gap-3">
            <div className="text-richblack-100  text-base font-semibold font-inter leading-6">
              Plans
            </div>
            <div className="text-richblack-400 text-sm flex flex-col gap-2 leading-5 font-inter font-normal">
              <p>Paid memberships</p>
              <p>For students</p>
              <p>Business solutions</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-richblack-100  text-base font-semibold font-inter leading-6">
                Community
              </div>
              <div className="text-richblack-400 text-sm flex flex-col gap-2 leading-5 font-inter font-normal">
                <p>Forums</p>
                <p>Chapters</p>
                <p>Events</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1px] bg-richblack-700"></div>

        {/* right */}
        <div className="flex w-full lg:flex-nowrap flex-wrap gap-4">
          <div className="lg:w-full w-[40%]">
            <Col data={FooterLink2[0]}></Col>
          </div>
          <div className="lg:w-full w-[40%]">
            <Col data={FooterLink2[1]}></Col>
          </div>
          <div className="lg:w-full w-[40%]">
            <Col data={FooterLink2[2]}></Col>
          </div>
        </div>
      </div>
      <div className="w-11/12 max-w-maxContent mx-auto">
        <div className=" h-[1px] bg-richblack-700 my-8"></div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <p className="font-inter font-medium text-sm text-richblack-300">Privacy Policy</p>
            <div className="bg-richblack-300 w-[1px] h-[90%]"></div>
            <p className="font-inter font-medium text-sm text-richblack-300">Cookie Policy</p>
            <div className="bg-richblack-300 w-[1px] h-[90%]"></div>
            <p className="font-inter font-medium text-sm text-richblack-300">Terms </p>
          </div>
          <div className="font-inter font-medium text-sm text-richblack-300">
            <p>
            Made by Amn © 2023 Studynotion
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
