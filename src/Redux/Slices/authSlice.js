import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token: localStorage.getItem("token")? localStorage.getItem("token"):null,
    // token:null,
    otp:"",
    signUpFormData:{},
    loading:false,
}
const authSlice= createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setToken(state,value) {
            state.token=value.payload;
        },
        setOtp(state,value) {
            state.otp=value.payload;
        },
        setSignUpFormData(state,value) {
            state.signUpFormData=value.payload
        },
        setLoading(state,value) {
            state.loading=value.payload;
        }
        
    }

})

export const {setToken,setOtp,setSignUpFormData,setLoading} = authSlice.actions;
export default authSlice.reducer;