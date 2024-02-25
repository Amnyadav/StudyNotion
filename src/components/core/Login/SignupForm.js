import React, { useState } from "react";
import { MdOutlineVisibility } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";
const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [accountType,setAccountType]=useState("student");
  console.log(accountType);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",

  });
  function changeHandler(event) {
    setFormData((prevdata) => {
      return {
        ...prevdata,
        [event.target.name]: event.target.value,
      };
    });
  }
  function submitHandler(event) {
    event.preventDefault();
    if (formData.password === formData.confirmPassword) {
      setIsLoggedIn((prev) => !prev);
      navigate("/dashboard");
      toast.success("account creted succesfully");
      const finalData={
        ...formData,
        accountType
      }
      console.log(finalData);
    } else {
      toast.error("paswword not matched");
    }
  }
  return (
    <div className="w-full">
      <div  className="flex  bg-richblack-800 rounded-full gap-x-1 p-1 max-w-max justify-evenly mt-4">
        <button onClick={()=>setAccountType("student")} className={`${accountType==='student'?'bg-richblack-900':'bg-transparent'} focus:text-richblack-5  text-richblack-200 py-2 px-5 transition-all duration-200 rounded-full w-full`}>
          student
        </button>
        <button onClick={()=>setAccountType("instructor")} className={`${accountType==='instructor'? 'bg-richblack-900':'bg-transparent'} focus:bg-richblack-900 focus:text-richblack-5 py-2 px-5 transition-all  text-richblack-200 duration-200 rounded-full w-full`}>
          instructor
        </button>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col">
        <div className="flex gap-2 mt-4">
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
              firstname<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="w-full bg-richblack-800 p-[12px] rounded-md outline-none placeholder:px-2 focus:outline-blue-400 text-richblack-5"
              required
              type="text"
              name="firstname"
              onChange={changeHandler}
              placeholder="enter name"
              value={formData.firstname}
            ></input>
          </label>
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
              lastnamename<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="w-full bg-richblack-800 p-[12px] rounded-md outline-none placeholder:px-2 focus:outline-blue-400 text-richblack-5"
              required
              type="text"
              name="lastname"
              onChange={changeHandler}
              placeholder="enter lastname"
              value={formData.lastname}
            ></input>
          </label>
        </div>
        <label className="mt-4">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
            email<sup className="text-pink-200">*</sup>
          </p>
          <input
            className="w-full bg-richblack-800 p-[12px] rounded-md outline-none placeholder:px-2 focus:outline-blue-400 text-richblack-5"
            required
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder="enter email"
            value={formData.email}
          ></input>
        </label>
        <div className="flex gap-2 mt-4">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
              password<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="w-full bg-richblack-800 p-[12px] rounded-md outline-none placeholder:px-2 focus:outline-blue-400 text-richblack-5"
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="enter password"
              value={formData.password}
            ></input>
            {
              <span
                className="text-white absolute right-3 bottom-4 text-[1.2rem] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </span>
            }
          </label>
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
              confirm password<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="w-full bg-richblack-800 p-[12px] rounded-md outline-none placeholder:px-2 focus:outline-blue-400 text-richblack-5"
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="confirm password"
              value={formData.confirmPassword}
            ></input>
            <span
              className="text-white absolute right-3 bottom-4 text-[1.2rem] cursor-pointer"
              onClick={() => setConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <MdOutlineVisibilityOff />
              ) : (
                <MdOutlineVisibility />
              )}
            </span>
          </label>
        </div>
        <button
          className="bg-yellow-300 py-2 font-bold text-[0.875rem] rounded-md mt-7
      "
        >
          create account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;