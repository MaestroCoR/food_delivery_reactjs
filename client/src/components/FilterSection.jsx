import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { straggerFadeInOut } from "../animations";
import { MdOutlineFastfood } from "../assets/icons";
import { statuses } from "../utils/styles";
import { SliderCard } from "../components";
const FilterSection = () => {
  const [category, setCategory] = useState("fruits");
  const products = useSelector((state) => state.products);
  return (
    <motion.div className="w-full flex items-start justify-start flex-col">
      <div className=" w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">
            Спробуйте наші страви
          </p>
          <div className=" w-96 h-1 rounded-md bg-emerald-500"></div>
        </div>
      </div>

      <div className="w-full overflow-x-scroll pt-6 flex items-center justify-left gap-6 py-8">
        {statuses &&
          statuses.map((data, i) => (
            <FilterCard
              data={data}
              category={category}
              setCategory={setCategory}
              index={i}
            />
          ))}
      </div>

      <div className="w-full flex items-center justify-evenly flex-wrap gap-4 mt-12">
        {products &&
          products
            .filter((data) => data.product_category === category)
            .map((data, i) => <SliderCard key={i} data={data} index={i} />)}
      </div>
    </motion.div>
  );
};

export const FilterCard = ({ data, index, category, setCategory }) => {
  return (
    <motion.div
      key={index}
      {...straggerFadeInOut(index)}
      onClick={() => setCategory(data.category)}
      className={`group w-28 min-w-[130px] cursor-pointer rounded-md py-6 
      ${category === data.category ? "bg-emerald-500" : "bg-primary"}
      hover:bg-emerald-500 shadow-md flex flex-col items-center justify-center gap-4`}
    >
      <div
        className={`w-10 h-10 rounded-full shadow-md flex
        items-center justify-center group-hover:bg-primary 
        ${category === data.category ? "bg-primary" : "bg-emerald-500"}`}
      >
        <MdOutlineFastfood
          className={`
        ${category === data.category ? "text-emerald-500" : "text-primary"}
        group-hover:text-emerald-500`}
        />
      </div>
      <p
        className={` text-base font-bold ${
          category === data.category ? "text-primary" : "text-textColor"
        } group-hover:text-primary`}
      >
        {data.title}
      </p>
    </motion.div>
  );
};
export default FilterSection;
