import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBSidebar = () => {
  return (
    <div
      className="h-full py-12 flex flex-col 
    bg-gray-100 bg-opacity-80 backdrop-blur-md shadow-md min-w-210 w-300 gap-3"
    >
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={Logo} className="w-20" alt="" />
        <p className="font-semibold text-xl">CheDelivery</p>
      </NavLink>

      <hr />
      <ul className="flex flex-col gap-4">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-emerald-500`
              : isNotActiveStyles
          }
          to="/dashboard/home"
        >
          Головна
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-emerald-500`
              : isNotActiveStyles
          }
          to="/dashboard/orders"
        >
          Замовлення
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-emerald-500`
              : isNotActiveStyles
          }
          to="/dashboard/items"
        >
          Товари
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-emerald-500`
              : isNotActiveStyles
          }
          to="/dashboard/newItem"
        >
          Додати товар
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-emerald-500`
              : isNotActiveStyles
          }
          to="/dashboard/users"
        >
          Користувачі
        </NavLink>
      </ul>

      <div
        id="block"
        className="flex mt-auto w-full items-center justify-center px-2 h-225 "
      >
        <div className="w-full h-full rounded-md bg-emerald-400 flex items-center justify-center flex-col gap-3 px-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <p className="text-2xl font-bold text-emerald-500">?</p>
          </div>
          <p className="text-xl text-primary font-semibold">Техпідтримка</p>
          <p className="text-base text-gray-200 text-center">
            Зіткнулись з труднощами? Напишіть нам
          </p>
          <p className="px-4 py-2 bg-primary text-emerald-500 rounded-full cursor-pointer">
            Написати
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBSidebar;
