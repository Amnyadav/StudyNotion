import React from 'react';
import instructor from '../../../assets/Images/Instructor.png';
import CTAbutton from '../homepage/Button';
import HighlightText from './HighlightText';
import { IoMdArrowForward } from "react-icons/io";
const InstructorSection = () => {
    return (
        <div className='flex lg:flex-row flex-col items-center gap-24'>
            <div className='shadow-img lg:w-[50%]'>
                <img src={instructor} loading='lazy'></img>
            </div>
            <div className='lg:w-[40%] flex flex-col gap-3'>
                <div className='lg:w-[50%] font-inter font-semibold text-4xl text-richblack-5 tracking-tighter '>
                    Become an <HighlightText text={'Instructor'}></HighlightText>
                </div>
                <p className='w-[90%] font-inter font-medium text-richblack-300 text-base'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                <div className='lg:pt-12 pt-6'>
                <CTAbutton active={true}>
                    <div className='flex items-center gap-1'>
                    Start Teaching Today
                    <IoMdArrowForward></IoMdArrowForward>
                    </div>
                </CTAbutton>
                </div>
            </div>
        </div>
    );
};

export default InstructorSection;