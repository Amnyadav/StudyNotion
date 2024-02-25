import HighlightText from './HighlightText';
import know_your_progress from '../../../assets/Images/Know_your_progress.png';
import compare_with_others from '../../../assets/Images/Compare_with_others.png';
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png';
import CTAbutton from '../homepage/Button';
const LearningPage = () => {
    return (
        <div className='pt-24 flex flex-col '>
            <div className='flex flex-col gap-3 md:items-center lg:items-center '>
                <div className='font-inter text-4xl font-semibold text-richblack-900 tracking-tighter' >
                Your swiss knife for <HighlightText text={'learning any language'}></HighlightText>
                </div>
                <p className='lg:w-[62%] md:text-center  lg:text-center font-inter font-medium text-base text-richblack-700'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>
            <div className='flex flex-col items-center lg:flex-row lg:justify-center'>
                <img src={know_your_progress} loading='lazy' className='object-contain lg:w-[35%]   aspect-square lg:-mr-32'></img>
                <img src={compare_with_others}  loading='lazy' className='object-contain lg:w-[40%]   aspect-square'></img>
                <img src={plan_your_lessons}  loading='lazy' className='object-contain lg:w-[40%]   aspect-square lg:-ml-36'></img>
            </div>
            <div className='flex justify-center'>
                <CTAbutton active={true} linkto={'signup'}> 
                    Learn More
                </CTAbutton>
            </div>
            
        </div>
    );
};

export default LearningPage;