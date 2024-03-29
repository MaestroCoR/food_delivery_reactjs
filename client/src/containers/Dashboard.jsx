// import React from "react";
import { DBInfo, DBSidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { setAllUserDetails } from "../context/actions/allUsersAction";
import { getAllUsers } from "../api";
import { getAllOrders } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import React, { useEffect } from "react";

const Dashboard = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);
  const allUsers = useSelector((state) => state.allUsers);
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, []);

  const orders = useSelector((state) => state.orders);
  useEffect(() => {
    if (!orders) {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, []);
  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <DBSidebar />
      <DBInfo />
    </div>
  );
};

export default Dashboard;
