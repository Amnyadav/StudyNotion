import React, { useEffect, useState } from "react";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { instructor } from "../../constants/navConstants";
import { IoCartOutline } from "react-icons/io5";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  console.log("printing in api.js", categories.CATEGORIES_API);
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log(result.data);
      const res = await result.data;
      console.log(res);
      setSubLinks(result.data.data);
      console.log(result.data.data);
    } catch (e) {
      console.log("error", e);
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
    <div className="w-full h-14 flex  items-center border-b border-richblack-700 ">
      <div className="w-10/12 max-w-maxContnt mx-auto flex justify-between items-center">
        <NavLink to="/">
          <img src={logo} width={160} height={42}></img>
        </NavLink>
        <nav className="flex items-center">
          <ul className="flex  gap-6 text-richblack-25">
            {NavbarLinks.map((navitem, index) => {
              return (
                <li key={index} className={``}>
                  {navitem.title === "Catalog" ? (
                    <div className="relative flex gap-[2px] items-center group">
                      {navitem.title}
                      <MdKeyboardArrowDown fontSize={"25"} />
                      <div className="invisible lg:w-[300px] absolute left-[50%] bottom-0 top-[50%] translate-x-[-50%] lg:translate-y-[10%] bg-richblack-5 text-richblack-900 rounded-md transition-all duration-200 opacity-0 group-hover:visible group-hover:opacity-100 h-fit z-50">
                        {subLinks?.filter((sublink)=>sublink.courses.length>0)?.map((link, index) => {
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
                      </div>
                      <div className="invisible opacity-0 absolute w-6 h-6 bg-richblack-5 top-[50%] left-[50%] bottom-0 translate-y-[50%] rotate-45 transition-all duration-200 group-hover:visible group-hover:opacity-100"></div>
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
          {user && user?.accountType !== instructor && (
            <NavLink to={"/dashboard/cart"} className="relative">
              <IoCartOutline />
              {totalItems > 0 && <span>{totalItems}</span>}
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
