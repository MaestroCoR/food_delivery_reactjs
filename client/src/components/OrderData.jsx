import { motion } from "framer-motion";
import React from "react";
import { buttonClick, straggerFadeInOut } from "../animations";
import { getAllOrders, updateOrderSts } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import { useDispatch } from "react-redux";

const OrderData = ({ index, data, admin }) => {
  const dispatch = useDispatch();

  const handleClick = (orderId, sts) => {
    updateOrderSts(orderId, sts).then((response) => {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    });
  };

  return (
    <motion.div
      {...straggerFadeInOut(index)}
      className="w-full flex flex-col items-start justify-start px-3 py-2 
  border relative border-gray-300 bg-gray-100 bg-opacity-80 drop-shadow-md
  gap-4"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-headingColor font-semibold">Замовлення</h1>
        <div className="flex items-center gap-4">
          <p className="flex items-center gap-1 text-textColor">
            Сума: ₴
            <span className="text-headingColor font-bold">{data.total}</span>
          </p>

          <p
            className="px-2 py-[2px] text-sm text-headingColor font-semibold
          capitalize rounded-md bg-emerald-400 drop-shadow-md"
          >
            {data?.status}
          </p>

          <p
            className={`text-base font-semibold capitalize border
          border-gray-300 px-2 py-[2px] rounded-md ${
            (data.sts === "preparing" && "text-orange-500 bg-orange-100") ||
            (data.sts === "cancelled" && "text-red-500 bg-red-100") ||
            (data.sts === "delivered" && "text-emerald-500 bg-emerald-100")
          }`}
          >
            {data?.sts}
          </p>

          {admin && (
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg font-semibold text-headingColor">Статус</p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "preparing")}
                className={`text-orange-500 text-base font-semibold
              capitalize border border-gray-300 px-2 py-[2px] rounded-md 
              cursor-pointer`}
              >
                Приготування
              </motion.p>
              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "cancelled")}
                className={`text-red-500 text-base font-semibold
              capitalize border border-gray-300 px-2 py-[2px] rounded-md 
              cursor-pointer`}
              >
                Відміна
              </motion.p>
              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "delivered")}
                className={`text-emerald-500 text-base font-semibold
              capitalize border border-gray-300 px-2 py-[2px] rounded-md 
              cursor-pointer`}
              >
                Доставлено
              </motion.p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center flex-wrap w-full">
        <div className="flex items-center justify-center gap-4">
          {data?.items &&
            data.items.map((item, j) => (
              <motion.div
                {...straggerFadeInOut(j)}
                key={j}
                className="flex items-center justify-center gap-1"
              >
                <img
                  src={item.imageURL}
                  className="w-10 h-10 object-contain"
                  alt=""
                />
                <div className="flex items-start flex-col">
                  <p className="text-base font-semibold text-headingColor">
                    {item.product_name}
                  </p>
                  <div className="flex items-start  gap-2">
                    <p className="text-base text-textColor">Кількість:</p>
                    <p className="font-semibold text-emerald-500">
                      {item.quantity}
                    </p>
                    <p className="flex items-start gap-1 text-textColor">
                      ₴ {parseFloat(item.product_price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
        <div
          className="flex items-start justify-start flex-col gap-2 px-6
          ml-auto w-full md:w-460"
        >
          <h1 className="text-lg text-headingColor font-semibold">
            {data.shipping_details.name}
          </h1>
          <p className="text-base text-headingColor -mt-2">
            {data.customer.email} {data.customer.phone}
          </p>

          <p className="text-base text-textColor -mt-2">
            {data.shipping_details.address.line1},
            {data.shipping_details.address.line2}{" "}
            {data.shipping_details.address.country},
            {data.shipping_details.address.city},
            {data.shipping_details.address.state} -{" "}
            {data.shipping_details.address.postal_code},
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderData;
