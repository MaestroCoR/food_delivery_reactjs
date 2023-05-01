import React, { useState } from "react";
import { LoginBg, Logo } from "../assets";
import LoginInput from "../components/LoginInput";
import { MdOutlineMail, MdLockOutline } from "../assets/icons";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  return (
    <div className=" w-screen h-screen relative overflow-hidden flex ">
      {/*Background image*/}
      <img
        src={LoginBg}
        className=" w-full h-full object-cover absolute top-0 left-0"
      />
      {/* content box*/}
      <div
        className="flex flex-col items-center bg-opacity-80
       bg-gray-200 w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6"
      >
        {/* Top logo section*/}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-10" alt="logo" />
          <p className="text-headingColor font-semibold text-3xl">
            CheDelivery
          </p>
        </div>
        {/* Welcome text*/}
        <p className="text-4xl font-semibold text-headingColor">Вітаємо</p>
        <p className="text-xl font-semibold text-textColor -mt-3">
          Увійдіть у акаунт
        </p>
        {/* Input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-3 py-4">
          <LoginInput
            placeHolder={"Email"}
            icon={<MdOutlineMail className="text-2xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeHolder={"Password"}
            icon={<MdLockOutline className="text-2xl text-textColor" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignUp={isSignUp}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
