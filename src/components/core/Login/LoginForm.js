import React from "react";
import { useState } from "react";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginForm = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [isVisible,setIsVisible]=useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setIsLoggedIn((prev) => !prev);
    navigate("/dashboard");
    toast.success("logged in succesfully");
  }
  return (
    <form onSubmit={submitHandler} className="flex flex-col mt-8 w-full">
      <label className="text-white">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
          Email<sup className="text-pink-200">*</sup>
        </p>
        <input
          className="w-full bg-richblack-800 p-[12px] rounded-md outline-none placeholder:px-2 focus:outline-blue-400"
          type="email"
          required
          value={formData.email}
          onChange={changeHandler}
          name="email"
          placeholder="enter email here"
        ></input>
      </label>
      <label className="relative text-white">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          className="w-full bg-richblack-800 p-[12px] rounded-md outline-none placeholder:px-2 focus:outline-blue-400"
          type={showPassword ? "text" : "password"}
          required
          value={formData.password}
          onChange={changeHandler}
          name="password"
          placeholder="enter password"
        ></input>
        <span
          className="text-white absolute right-3 bottom-4 text-[1.2rem] cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <MdOutlineVisibilityOff fill="#afb2bf" />
          ) : (
            <MdOutlineVisibility fill="#afb2bf" />
          )}
        </span>
        
      </label>
      <Link to="#" className="text-blue-400 text-xs  self-end mt-1 ">forgot password</Link>
      <button className="bg-yellow-300 py-1 font-bold text-[0.875rem] rounded-md mt-7
      ">Sign In</button>
    </form>
  );
};

export default LoginForm;
