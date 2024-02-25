import React from 'react';

const HighlightText = (props) => {
    return (
        // <p className='font-bold text-richblue-200'>
        //     {props.text}
        // </p>
        <span className='span-head leading-10 bg-gradient-to-t from-green-300 via-blue-500 to-purple-600font-bold bg-clip-text text-transparent
        
        '>
            {props.text}
        </span>
    );
};

export default HighlightText;