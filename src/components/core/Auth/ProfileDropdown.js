import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowDropDown } from "react-icons/md";
import { RiDashboard2Line } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import useOnClickOutside from "../../../hooks/useOnClickOutSide";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

import { logout } from "../../../services/operations/authRelated";
const ProfileDropdown = () => {
  const dispatch=useDispatch();
  const user = useSelector((state) => state.profile.user);
  const dropdown = useRef();
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const clickHandler = () => {
    dropdown.current.style.display = "block";
  };
  useOnClickOutside(dropdown, () => setOpen(false));
  return (
    <div onClick={() => setOpen(true)} className="cursor-pointer">
      <div className="flex items-center">
        <img src={`${user.image}`} className="aspect-square rounded-full w-[30px]"></img>
        <div><MdArrowDropDown className="text-richblack-5 text-2xl"></MdArrowDropDown></div>
      </div>
      {open && (
        <div
          className="  absolute bg-richblack-800 p-2 rounded-md border border-richblack-700"
          ref={dropdown}
        >
          <div className="text-richblack-5 flex flex-col gap-2">
            <NavLink to={"/dashboard/my-profile"}>
              <div className="flex items-center gap-1">
                <RiDashboard2Line className="text-richblack-5"></RiDashboard2Line>
                <p>Dashboard</p>
              </div>
            </NavLink>
            <div 
            onClick={
                ()=>{
                    const logoutFunc=(logout(navigate))
                    logoutFunc(dispatch);
                    setOpen(false);
                }} 
            className="flex items-center gap-1">
              <VscSignOut
                fontSize={24}
                className="ring-richblack-5"
              ></VscSignOut>
              <p>Logout</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
