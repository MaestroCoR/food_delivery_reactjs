import { motion } from "framer-motion";
import React from "react";
import { Delivery, HeroBg } from "../assets";
import { buttonClick, straggerFadeInOut } from "../animations";
import { randomData } from "../utils/styles";

const Home = () => {
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="px-4 py-1 flex items-center justify-center gap-2 bg-green-100 rounded-full">
          <p className="text-lg font-semibold text-emerald-600">
            Безкоштовна доставка
          </p>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
            <img
              src={Delivery}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[36px] text-headingColor md:text-[64px] font-sans font-extrabold">
          Найшвидша доставка їжі в{" "}
          <span className="text-emerald-600">Чернівцях</span>
        </p>

        <p className="text-textColor text-lg">
          Смакуйте на повну та насолоджуйтеся безмежними кулінарними враженнями,
          завдяки нашому сервісу доставки їжі в Чернівцях. Забезпечуємо швидку,
          якісну та зручну доставку прямо до ваших дверей, дозволяючи вам
          насолоджуватися кожною стравою без зусиль та втрати часу.
        </p>
        <motion.button
          {...buttonClick}
          className="bg-gradient-to-bl from-emerald-400 to-emerald-600 px-4 py-2 rounded-xl text-black text-base font-semibold"
        >
          Замовити
        </motion.button>
      </div>

      <div className="py-2 flex-1 flex items-center relative justify-end ">
        <img
          className="absolute top-0 right-0 md:-right-12 w-full h-420 md:w-auto md:h-650 bg-opacity-30"
          src={HeroBg}
          alt=""
        />
        <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-5">
          {randomData &&
            randomData.map((data, i) => (
              <motion.div
                key={i}
                {...straggerFadeInOut(i)}
                className="
              w-32 h-28 md:h-auto md:w-190 p-4 bg-gray-200 bg-opacity-80 backdrop-blur-md
              rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={data.imageURL}
                  className="w-12 h-12 md:w-32 md:h-32 md:-mt-2 object-contain rounded-md"
                />
                <p className="text-sm font-semibold text-textColor">
                  {data.product_name.slice(0, 16)}
                </p>
                {/* <p className="text-[10px] text-center md:text-base text-gray-500 capitalize">
                  {data.product_category}
                </p> */}
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-emerald-600">
                    ₴{data.product_price}
                  </span>
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
