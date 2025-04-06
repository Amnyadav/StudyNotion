import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Catalog from "./pages/Catalog";
import Course from "./pages/Course";

import Otp from "./pages/Otp";
import OpenRoute from "./components/core/Login/OpenRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import MyProfile from "./components/dashboard/MyProfile";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/core/Login/PrivateRoute";
import Settings from "./components/dashboard/settings/Settings";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./services/operations/ProfileRelated";
import Cart from "./components/dashboard/cart/Cart";
import EnrolledCourses from "./components/dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import MyCourses from "./components/dashboard/MyCourses";
import AddCourse from "./components/dashboard/AddCourse";
import EditCourse from "./components/dashboard/EditCourse";
import VideoDetails from "./components/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
import About from "./pages/About";
import Contact from "./pages/Contact";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token=useSelector((state)=>state.auth.token);
  const user =useSelector((state)=>state.profile.user);
  console.log("token in app.js......",token)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=> {
    if(token) {
      dispatch(getUserDetails(token,navigate));
    }
  },[])
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar className=""></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>} ></Route>
        <Route path="/contact" element={<Contact></Contact>} ></Route>
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login></Login>
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn}></Signup>}
        ></Route>
        <Route
          element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings></Settings>} ></Route>
          {
            user?.accountType===ACCOUNT_TYPE.STUDENT &&
            (
              <>
              <Route path="/dashboard/cart" element={<Cart></Cart>}></Route>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses></EnrolledCourses>} ></Route>
              </> 
            )

          }
          {
            user?.accountType===ACCOUNT_TYPE.INSTRUCTOR &&
            (
              <>
              <Route path="/dashboard/my-courses" element={<MyCourses></MyCourses>} ></Route>
              <Route path="/dashboard/add-course" element={<AddCourse></AddCourse>}></Route>
              <Route path="/dashboard/edit-course/:courseId" element={<EditCourse></EditCourse>}></Route>
              </>
            )
          }




         

        </Route>
        <Route path="/otp" element={<Otp></Otp>}></Route>
        <Route
          path="/Catalog/:catalogName"
          element={<Catalog></Catalog>}
        ></Route>
        <Route path="/courses/:courseId" element={<Course></Course>}></Route>
         
         <Route
          element={
            <PrivateRoute>
              <ViewCourse></ViewCourse>
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails></VideoDetails>}
              />
            </>
          )}
        </Route>
        {/* error 404 */}
         <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
