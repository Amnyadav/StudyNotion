import React, { useEffect, useState } from "react";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { instructor } from "../../constants/navConstants";
import { IoCartOutline } from "react-icons/io5";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from 'react-redux'
import axios from "axios";
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log(result.data);
      const res = await result.data;
      // console.log(res);
      setSubLinks(result.data.data);
      console.log(result.data.data);
    } catch (e) {
      console.log("error in fetching categories",  e);
    }
  };
  useEffect(() => {
    fetchSubLinks();
    // fetchLinks();
    console.log(subLinks);
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="bg-richblack-800 z-50 w-full h-14 flex  items-center border-b border-richblack-700 ">
      <div className="w-10/12 max-w-maxContent mx-auto flex justify-between items-center">
        <NavLink to="/">
          <img src={logo} width={160} height={42}></img>
        </NavLink>
        <nav className="md:flex items-center hidden">
          <ul className="flex  gap-6 text-richblack-25">
            {NavbarLinks.map((navitem, index) => {
              return (
                <li key={index} className={``}>
                  {navitem.title === "Catalog" ? (
                    <div className="relative flex gap-[2px] items-center group">
                      {navitem.title}
                      <MdKeyboardArrowDown fontSize={"25"} />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        {subLinks
                          ?.filter((sublink) => sublink.courses.length > 0)
                          ?.map((link, index) => {
                            return (
                              <NavLink
                                key={index}
                                to={`/Catalog/${link.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                              >
                                <p
                                  className={
                                    "bg-transparent py-4  pl-4 hover:bg-richblack-50 rounded-lg"
                                  }
                                >
                                  {link.name}
                                </p>
                              </NavLink>
                            );
                          })}
                          <div className=" absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      </div>
                      
                    </div>
                  ) : (
                    <NavLink to={navitem?.path}>
                      <p
                        className={`${
                          matchRoute(navitem?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {navitem.title}
                      </p>
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex gap-4">
          {user && user?.accountType !== "Instructor" && (
            <NavLink to={"/dashboard/cart"} className="relative">
              <IoCartOutline size={38} className=" text-richblack-5" />
              {totalItems > 0 && <span className="absolute top-0 right-0 bg-yellow-100 text-richblack-900 rounded-full w-4 h-4 font-bold  p-1 grid place-content-center text-sm anim">{totalItems}</span>}
            </NavLink>
          )}
          {token == null && (
            <NavLink to={"/login"}>
              <button className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-md border border-richblack-700">
                Login
              </button>
            </NavLink>
          )}
          {token === null && (
            <NavLink to={"/signup"}>
              <button className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-md border border-richblack-700">
                Signup
              </button>
            </NavLink>
          )}
          {
            // error ho skta h
            user && <ProfileDropdown></ProfileDropdown>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
