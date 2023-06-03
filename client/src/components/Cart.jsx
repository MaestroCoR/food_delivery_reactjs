import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { buttonClick, slideIn, straggerFadeInOut } from "../animations";
import { useDispatch, useSelector } from "react-redux";
import { setCartOff } from "../context/actions/displayCartAction";
import { BiChevronsRight, MdOutlineFilterAltOff } from "../assets/icons";
import { getAllCartItems, increaseItemQuantity } from "../api";
import { setCartItems } from "../context/actions/cartAction";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    if (cart) {
      cart.map((data) => {
        total = total + data.product_price * data.quantity;
        setTotal(total);
      });
    }
  }, [cart]);
  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-400 md:w-508 bg-gray-100 bg-opacity-80  
      backdrop-blur-md shadow-md h-screen"
    >
      <div className="w-full flex items-center justify-between py-4 pb-12 px-6">
        <motion.i
          {...buttonClick}
          className="cursor-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronsRight className="text-[50px] text-textColor" />
        </motion.i>
        <p className="text-2xl text-headingColor font-bold">Корзина</p>
        <motion.i {...buttonClick} className="cursor-pointer">
          <MdOutlineFilterAltOff className="text-[30px] text-textColor" />
        </motion.i>
      </div>

      <div
        className="flex-1 flex flex-col items-start justify-start rounded-t-3xl
      bg-white h-full py-6 gap-3 relative"
      >
        {cart && cart?.length > 0 ? (
          <>
            <div
              className="flex flex-col w-full items-start justify-start gap-3
        h-[65%] overflow-y-scroll scrollbar-none px-4"
            >
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>
            <div
              className="bg-white rouded-t-[60px] w-full h-[35%] flex flex-col
      items-center justify-center px-4 py-6 gap-24"
            >
              <div className="w-full flex items-center justify-evenly">
                <p className="text-3xl text-textColor font-semibold">Сума:</p>
                <p
                  className="text-3xl text-emerald-400 font-semibold flex 
                items-center justify-center gap-1"
                >
                  <span className="text-textColor">₴</span> {total}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-primary font-bold">Корзина порожня</h1>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId) => {
    dispatch(alertSuccess("Оновлено кількість товару"));
    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };
  const incrementCart = (productId) => {
    dispatch(alertSuccess("Оновлено кількість товару"));
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  useEffect(() => {
    setItemTotal(data.product_price * data.quantity);
  }, [itemTotal, cart]);

  return (
    <motion.div
      key={index}
      {...straggerFadeInOut(index)}
      className="w-full
    flex items-center justify-start bg-slate-100 rounded-md drop-shadow-md px-4 gap-4"
    >
      <img
        src={data?.imageURL}
        className=" w-24 min-w-[94px] h-24 object-contain"
      />
      <div className="flex items-center justify-start gap-1 w-full">
        <p className=" text-base text-textColor font-semibold">
          {data?.product_name}
          <span className="text-sm block capitalize text-gray-400">
            {data?.product_category}
          </span>
        </p>
        <p className=" text-xs font-semibold text-emerald-400 ml-auto">
          ₴{itemTotal}
        </p>
      </div>

      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClick}
          onClick={() => decrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md
           bg-white cursor-pointer"
        >
          <p className="text-xl font-semibold text-textColor">-</p>
        </motion.div>
        <p className="text-lg text-textColor font-semibold">{data?.quantity}</p>
        <motion.div
          {...buttonClick}
          onClick={() => incrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md
           bg-white cursor-pointer"
        >
          <p className="text-xl font-semibold text-textColor">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Cart;
