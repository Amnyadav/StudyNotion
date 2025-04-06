import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import HighlightText from "../components/core/homepage/HighlightText";
import CTAbutton from "../components/core/homepage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/homepage/CodeBlock";
import Footer from "../components/Footer/Footer.js";
import TimeLineSection from "../components/core/homepage/TimeLineSection.js";
import LearningPage from "../components/core/homepage/LearningPage.js";
import InstructorSection from "../components/core/homepage/InstructorSection.js";
import ReviewSlider from "../components/core/homepage/ReviewSlider.js";
import ExploreMore from "../components/core/homepage/ExploreMore.js";
import { useTitle } from "../hooks/useTitle.js";
const Home = () => {
  useTitle("Home")
  return (
    <div className="">
      {/* section1 */}
      <div className="flex flex-col w-10/12 max-w-maxContent mx-auto relative lg:items-center justify-between text-white">
        <div className="bg-richblue-800 text-richblack-100 rounded-full p-1 mt-16 w-fit transition-all duration-200 hover:scale-95 group">
          <NavLink to={"/signup"}>
            <div className="flex gap-2 items-center px-10 py-[5px] group-hover:bg-richblack-900 rounded-full font-semibold">
              <p>Become an instructor</p>
              <IoMdArrowForward />
            </div>
          </NavLink>
        </div>

        <div className="lg:text-center text-4xl font-semibold mt-7">
          Empower your future with
          <HighlightText text={" Coding Skills"}></HighlightText>
        </div>
        <div className="w-[90%] font-inter leading-6  lg:text-center text-lg mt-4 text-richblack-300 font-semibold ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex lg:justify-center justify-start gap-7 mt-8">
          <CTAbutton linkto={"/signup"} active={true}>
            Learn More
          </CTAbutton>
          <CTAbutton linkto={"/login"} active={false}>
            Book a Demo
          </CTAbutton>
        </div>
        <div className="video-box">
          <video
            src={Banner}
            muted
            loop
            autoPlay
            className="mx-3 my-11 video"
            loading="lazy"
          ></video>
        </div>
        {/* code section */}
        <div className="flex flex-col">
          <div className="">
            <CodeBlock
              position={"lg:flex-row"}
              heading={
                <div>
                  Unlock your <HighlightText text={"coding potential"} /> with
                  our online courses.
                </div>
              }
              subhead={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              code={`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <title>This is myPage</title>
                    </head>
                    <body>
                    <h1><a href="/">Header</a></h1>
                    <nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>
                    </nav>
                    </body>`}
              codeColor={"text-yellow-50"}
              ctaBtn1={{
                active: true,
                linkto: "/signup",
                btnText: "Try it Yourself",
              }}
              ctaBtn2={{
                active: false,
                linkto: "/signup",
                btnText: "Learn More",
              }}
            ></CodeBlock>
          </div>
          <div className="my-0">
            <CodeBlock
              position={"lg:flex-row-reverse"}
              heading={
                <div>
                  Start{" "}
                  <HighlightText text={"coding in seconds"}></HighlightText>
                </div>
              }
              subhead={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              code={`<!DOCTYPE html>/n
                    <html lang="en">/n
                    <head>/n/n
                    <title>This is myPage</title>/n
                    </head>/n
                    <body>/n
                    <h1><a href="/">Header</a></h1>/n
                    <nav> <a href="/one">One</a> <a href="/two">Two</a> /nthree">Three</a>/n
                    </nav>/n
                    </body>/n`}
              codeColor={`text-blue-25`}
              ctaBtn1={{
                active: true,
                linkto: "/signup",
                btnText: "Try it Yourself",
              }}
              ctaBtn2={{
                active: false,
                linkto: "/signup",
                btnText: "Learn More",
              }}
            ></CodeBlock>
          </div>
        </div>
        <div>
          <ExploreMore></ExploreMore>
        </div>
      </div>
      {/* section2 */}
      <div className="bg-pure-greys-5 lg:mt-0 ">
        <div className="home-page-bg lg:h-[333px]">
          <div className="w-10/12 max-w-maxContent mx-auto flex flex-col">
            <div className="lg:h-[200px]"></div>
            <div className="flex justify-center gap-6 lg:mt-0 mt-8">
              <CTAbutton linkto={"/signup"} active={true}>
                <div className="flex items-center">
                  Explore Full Catelog
                  <IoMdArrowForward className="text-lg font-bold" />
                </div>
              </CTAbutton>
              <CTAbutton linkto={"/login"} active={false}>
                Learn More
              </CTAbutton>
            </div>
          </div>
        </div>
        <div className="w-10/12 py-14 max-w-maxContent mx-auto flex flex-col gap-14">
          {/* header box */}
          <div className="w-full flex lg:flex-row flex-col gap-3 justify-between">
            <div className="lg:w-[40%] font-inter font-semibold text-4xl tracking-tighter">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."}></HighlightText>
            </div>
            <div className="lg:w-[45%] flex flex-col gap-10">
              <p className=" font-inter text-base font-medium leading-6 ">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CTAbutton active={true}>Learn More</CTAbutton>
            </div>
          </div>
          {/* content box */}
          <TimeLineSection></TimeLineSection>
          <LearningPage></LearningPage>
        </div>
      </div>
      {/* section 3 */}
      <div className="bg-richblack-900 py-[5.62rem]">
        <div className="w-10/12 max-w-maxContent mx-auto">
          <InstructorSection></InstructorSection>
          <div>
            <p className="text-center text-richblack-5 mt-12 font-semibold text-4xl">
              Reviews from other learners
            </p>
          </div>
          <ReviewSlider></ReviewSlider>
        </div>
      </div>
      {/* section footer */}
      <div className="bg-richblack-800 py-14">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
