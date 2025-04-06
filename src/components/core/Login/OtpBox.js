import React from "react";

const OtpBox = () => {
  const changeHandler=(e)=> {
    let val="";
    if(isNaN(e.target.value)) {
      e.target.value="";
      return ;
    }
    val=e.target.value;
    const next=e.target.nextElementSibling
    console.log(next);
    if(val!=="") {
      if(next) {
        next.focus();
      }
    }

    
    
  }
  return (
    <div>
      <input
        className="appearance-none w-14 h-14 rounded-lg text-center text-xl font-bold bg-richblack-700 border-none p-2"
        type="text"
        inputMode="numeric"
        maxLength={1}
        onChange={changeHandler}
        required={true}
      ></input>
    </div>
  );
};

export default OtpBox;
