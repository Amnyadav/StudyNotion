
import { setLoading, setToken } from "../../Redux/Slices/authSlice";
import { setUser } from "../../Redux/Slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { auth } from "../apis";
import { setOtp } from "../../Redux/Slices/authSlice";
import { setSignUpFormData } from "../../Redux/Slices/authSlice";
import { toast } from "react-hot-toast";
const endPoints = {
    LOGIN_API:auth.LOGIN_API,
    SIGNUP_API:auth.SIGNUP_API,
    OTP_GENERATE_API:auth.OTP_GENERATE_API

}
export const signup=(bodyData,navigate)=> {
    return async(dispatch) =>{
        const toastId=toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const res=await apiConnector("POST",endPoints.SIGNUP_API,bodyData);
            console.log(res?.data?.data);
            console.log("signup successfully");
            navigate("/login");
            toast.success("signed up successfully")
            
        }catch(e) {
            console.log(e,"error while comparing otp")
            toast.error("error in signIn")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}
export const generateOtp=(formData,navigate)=> {
    return async(dispatch) => {
        const toastId=toast.loading("Loading....")
        try {
            const res = await apiConnector("POST", endPoints.OTP_GENERATE_API, {
              email:formData.email,
            });
            dispatch(setOtp(res?.data?.data.otp));
            dispatch(setSignUpFormData(formData));
            navigate("/otp");
            toast.success("otp sent successfully")
            console.log("otp", res?.data?.data);
          } catch (e) {
            console.log(e, "eeor in generating the otp");
            toast.error("error in sending otp")
          }
          toast.dismiss(toastId)
        
    }
}
export const login=(formData,navigate)=> {
    
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true))
        try {
            const res= await apiConnector("POST",endPoints.LOGIN_API,formData);
            const {token}=res.data;
            const user=res.data.data;
            dispatch(setUser(user));
            dispatch(setToken(token));
            localStorage.setItem("token",token);
            localStorage.setItem("user",JSON.stringify(user));
            toast.success("LogedIn seccessfully")
            console.log(token);
            navigate("/dashboard/my-profile");
          }catch(e) {
            console.log(e);
            toast.error("login failed")
          }
        //   toast.dismiss(toastId);
        
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export const logout=(navigate)=>{
   return (dispatch) =>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login")
   }
   
}