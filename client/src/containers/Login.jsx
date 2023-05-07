import React, { useEffect, useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { MdOutlineMail, MdLockOutline, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { setUserDetails } from "../context/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { alertInfo, alertWarning } from "../context/actions/alertActions";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              console.log(data);
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };
  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_password === "") {
      dispatch(alertInfo("Поля повинні бути заповнені"));
    } else {
      if (password === confirm_password) {
        setUserEmail("");
        setPassword("");
        setConfirm_password("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
        console.log("Equal");
      } else {
        dispatch(alertWarning("Пароль не співпадає"));
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Пароль не співпадає"));
    }
  };

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
          <img src={Logo} className=" w-24" alt="logo" />
          <p className="text-headingColor font-semibold text-2xl mt-3">
            CheDelivery
          </p>
        </div>
        {/* Welcome text*/}
        <p className="text-4xl font-semibold text-headingColor">Вітаємо</p>
        <p className="text-xl font-semibold text-textColor -mt-3">
          {!isSignUp ? "Увійдіть у акаунт" : "Зареєструйте акаунт"}
        </p>
        {/* Input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-3 py-4">
          <LoginInput
            placeHolder={"Електронна пошта"}
            icon={<MdOutlineMail className="text-2xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeHolder={"Пароль"}
            icon={<MdLockOutline className="text-2xl text-textColor" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput
              placeHolder={"Підтвердіть пароль"}
              icon={<MdLockOutline className="text-2xl text-textColor" />}
              inputState={confirm_password}
              inputStateFunc={setConfirm_password}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p>
              Не маєте акаунт:{" "}
              <motion.button
                {...buttonClick}
                className=" text-red-400 cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Зареєструватись
              </motion.button>
            </p>
          ) : (
            <p>
              Маєте акаунт:{" "}
              <motion.button
                {...buttonClick}
                className=" text-red-400 cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Увійти
              </motion.button>
            </p>
          )}

          {/* Button section */}
          {!isSignUp ? (
            <motion.button
              {...buttonClick}
              className=" w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signInWithEmailPass}
            >
              Увійти
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className=" w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signUpWithEmailPass}
            >
              Зареєструватись
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">або</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-opacity-30 bg-gray-400 backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="text-base text-headingColor">
            Увійти за допомогою Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
