import React from "react";
import { Header } from "../components";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { NavLink } from "react-router-dom";
import { AiOutlineArrowLeft } from "../assets/icons";
import { Bill } from "../assets";

const CheckOutSuccess = () => {
  return (
    <main className=" w-screen min-h-screen flex items-center justify-start flex-col">
      <Header />
      <div
        className="w-full flex flex-col items-center mt-40 px-6 
      md:px-24 2xl:px-96 gap-12 pb-24"
      >
        <img src={Bill} className=" w-275 md:w-350" alt="" />

        <h1 className="md:text-[50px] text-[24px] text-headingColor font-bold">
          Оплата пройшла успішно
        </h1>
        <motion.div {...buttonClick}>
          <NavLink
            to={"/"}
            className="flex items-center justify-center gap-4 cursor-pointer 
            text-2xl text-textColor font-semibold px-4 py-2 rounded-md
            border border-gray-300 hover:shadow-md"
          >
            <AiOutlineArrowLeft className="text-3xl text-textColor" />
            Повернутись на головну
          </NavLink>
        </motion.div>
      </div>
    </main>
  );
};

export default CheckOutSuccess;
