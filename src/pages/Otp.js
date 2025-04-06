import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/operations/authRelated';

const Otp = () => {
    const dispatch=useDispatch();
    const otp=useSelector((state)=>state.auth.otp);
    const navigate=useNavigate();
    const signUpFormData=useSelector((state)=>state.auth.signUpFormData);
    console.log("otp from redux",otp);
    const[digits,setDigits]=useState({
        "1":"",
        "2":"",
        "3":"",
        "4":"",
        "5":"",
        "6":"",
    });
    const validateOtp=async()=> {
        const values=Object.values(digits);
        const otpEntered=values.join("");
        console.log("otp enter ",otpEntered)
        console.log(signUpFormData);
        if(otpEntered===otp) {
            const bodyData={...signUpFormData,otp};
            const signupFunc=signup(bodyData,navigate);
            signupFunc(dispatch);
        }
        else {
            console.log("otp not mathced....please enter correct otp")
        }
    }
    // console.log(digits);
    const changeHandler=(e)=> {
        let val="";
        if(isNaN(e.target.value)) {
          e.target.value="";
          return ;
        }
        val=e.target.value;
        setDigits((prev)=> {
            return {
                ...prev,
                [e.target.name]:val
            }
        })
        console.log(digits);
        const next=e.target.nextElementSibling
        if(val!=="") {
          if(next) {
            next.focus();
          }
        }
    }
    const keyPressHandler=(e)=> {
        const key=e.key.toLowerCase();
        if(key==='backspace' || key==='delete' ) {
            const prev=e.target.previousElementSibling;
            if(prev && e.target.value==="") {
                prev.focus();
            }
            e.target.value="";
            setDigits((prev)=> {
                return {
                    ...prev,
                    [e.target.name]:"",
                }
            });
            console.log(digits);
           
        }  
        if(key==='arrowleft') {
            const prev=e.target.previousElementSibling;
            if(prev) {
                prev.focus();
            }
        }
        if(key==='arrowright') {
            const next=e.target.nextElementSibling;
            if(next) {
                next.focus();
            }
        }
    }
    return (
        <div className='min-h-full flex flex-row justify-center my-auto text-richblack-5'>
            <div className='flex flex-col gap-3 p-3'>
                <div className='flex flex-col gap-4 w-[85%]'>
                    <p className='text-4xl font-inter font-bold'>verify email</p>
                    <p className='text-lg  text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
                    <div className='flex justify-between'>
                        <input
                            className="appearance-none w-14 h-14 rounded-lg text-center text-xl font-bold bg-richblack-700 border-none p-2"
                            name='1'
                            value={digits[1]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            onChange={changeHandler}
                            required={true}
                            onKeyDown={keyPressHandler}
                            focus={true}
                        ></input>
                            <input
                            className="appearance-none w-14 h-14 rounded-lg text-center text-xl font-bold bg-richblack-700 border-none p-2"
                            name='2'
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            onChange={changeHandler}
                            required={true}
                            onKeyDown={keyPressHandler}
                        ></input>  
                        <input
                            className="appearance-none w-14 h-14 rounded-lg text-center text-xl font-bold bg-richblack-700 border-none p-2"
                            name='3'
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            onChange={changeHandler}
                            required={true}
                            onKeyDown={keyPressHandler}
                        ></input> 
                        <input
                            className="appearance-none w-14 h-14 rounded-lg text-center text-xl font-bold bg-richblack-700 border-none p-2"
                            name='4'
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            onChange={changeHandler}
                            required={true}
                            onKeyDown={keyPressHandler}
                        ></input> 
                        <input
                            className="appearance-none w-14 h-14 rounded-lg text-center text-xl font-bold bg-richblack-700 border-none p-2"
                            name='5'
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            onChange={changeHandler}
                            required={true}
                            onKeyDown={keyPressHandler}
                        ></input> 
                        <input
                            className="appearance-none w-14 h-14 rounded-lg text-center text-xl font-bold bg-richblack-700 border-none p-2"
                            name='6'
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            onChange={changeHandler}
                            required={true}
                            onKeyDown={keyPressHandler}
                        ></input> 
                         
                    </div>
                    <button onClick={validateOtp} className={`btn text-[13px] w-full text-center px-6 py-3 rounded-md font-bold 
            bg-yellow-50  text-richblack-900 '} hover:scale-95 transition-all duration-200 `}>verify</button>
                </div>
            </div>
        </div>
    );
};

export default Otp;