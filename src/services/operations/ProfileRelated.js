import { toast } from "react-hot-toast"

import { setUser,setLoading } from "../../Redux/Slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authRelated"
const {
    GET_USER_DETAILS_API,
    GET_ENROLLED_COURSES_API,
}=profileEndpoints;
export function getUserDetails(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        const userImage = response.data.data.image
          ? response.data.data.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        dispatch(setUser({...response.data.data,image:userImage}))
      } catch (error) {
        dispatch(logout(navigate))
        console.log("GET_USER_DETAILS API ERROR............", error)
        toast.error("Could Not Get User Details")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }

export const getUserEnrolledCourses=async(token)=> {
        const toastId=toast.loading("Loading...");
        let result=[];
        try {   
            const response=await apiConnector(
                "GET",
                GET_ENROLLED_COURSES_API,
                null,
                {
                    Authorization:`Bearer ${token}`
                }
            );
            console.log(response);
            const enrolledCourses=response.data.data;
            result=enrolledCourses;
            toast.success("enrolled courses fetch succesfully");

        }catch(e) {
          console.log(e,"erro in get enrolled courses")
            toast.error("failed")
        }
        toast.dismiss(toastId)
        return result;
}