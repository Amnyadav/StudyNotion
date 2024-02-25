import React from 'react';

const Col = ({data}) => {
    const title=data.title;
    const items=data.links;
    return (
        <div className="flex flex-col gap-3">
            <div className="text-richblack-100 leading-6 font-semibold text-base font-inter ">{title}</div>
            {
                items.map((item,index)=> {
                    return <div key={index} className="text-richblack-400 text-sm flex flex-col gap-2 font-inter font-normal leading-5 ">
                        <div className='self-start'>{item.title}</div>
                    </div>
                })
            }
        </div>
    );
};

export default Col;