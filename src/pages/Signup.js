import React from "react";
import Template from "../components/core/Login/Template";
import signupImg from "../assets/Images/signup.webp";

const Signup = ({setIsLoggedIn}) => {
  return (
    <div>
      <Template
        title="Join the millions learning to code with StudyNotion for free"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        image={signupImg}
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}
      ></Template>
    </div>
  );
};

export default Signup;
