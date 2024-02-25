import React from 'react';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimelineImage from '../../../assets/Images/TimelineImage.png';
const timelineData=[
    {
        Logo:Logo1,
        Heading:"Leadership",
        Desc:"fully commited to success company"
    },
    {
        Logo:Logo2,
        Heading:"Responsibility",
        Desc:"Student will always be our top priority"
    },
    {
        Logo:Logo3,
        Heading:"Flexiblity",
        Desc:"the ability to switch is an important skill"
    },
    {
        Logo:Logo4,
        Heading:"Solve aproblem",
        Desc:"code your way to a solution"
    }
]
const TimeLineSection = () => {
    return (
        <div className='flex lg:flex-row flex-col gap-10 items-center justify-between lg:gap-10'>
            <div className=' flex flex-col gap-8'>
                {
                    timelineData.map((item,index) => 
                            (<div key={index} className='relative flex gap-6 py-4 px-3 items-start'>
                                <div className='w-14 h-14 bg-white p-1 flex justify-center items-center rounded-full'>
                                    <img src={item.Logo} className='w-5 h-5' loading='lazy'></img>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <p className='text-richblack-800 font-inter font-semibold text-lg tracking-wide'>{item.Heading}</p>
                                    <p className='font-inter font-normal text-base tracking-wide'>{item.Desc}</p>
                                </div>
                                {
                                    index+1<timelineData.length && 
                                    <div className='absolute dotted-line h-[60%] w-[1px] bg-richblack-100'>
                                    </div>
                                }
                            </div>)
                    )
                }
            </div>
            <div className=' relative flex flex-col z-10'>
                <div className='absolute  lg:top-8 lg:-left-5 timeline-bg rounded-full opacity-60 -z-10'>
                </div>
                <div className='w-full timeline-img self-end'>
                    <img src={TimelineImage} loading='lazy'></img>
                </div>
                <div className='h-fit absolute  left-0 lg:bottom-0  lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%]  self-start bg-caribbeangreen-700 lg:p-10 p-5 flex flex-col gap-4  lg:flex-row lg:gap-12 '>
                    <div className='flex w-full lg:gap-6 gap-5'>
                        <p className='text-4xl w-[40%] text-white font-inter font-bold tracking-tight'>10</p>
                        <div className='flex flex-col w-[50%] font-inter font-medium text-sm uppercase text-caribbeangreen-300'>
                            <p>Years</p>
                            <p>Experience</p>
                        </div>
                    </div>
                    <div className='w-[1px] lg:block hidden bg-caribbeangreen-500'>
                    </div>
                    <div className='flex w-full lg:gap-6 gap-5' >
                        <p className='text-4xl w-[40%] text-white font-inter font-bold tracking-tight'>250</p>
                        <div className='flex flex-col w-[50%] font-inter font-medium text-sm  text-caribbeangreen-300 uppercase'>
                            <p className=''>types of</p>
                            <p>courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeLineSection;