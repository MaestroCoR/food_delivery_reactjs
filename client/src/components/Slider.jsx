import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import SliderCard from "./SliderCard";
const Slider = () => {
  const products = useSelector((state) => state.products);
  const [fruits, setFruits] = useState(null);

  useEffect(() => {
    setFruits(products?.filter((data) => data.product_category === "fruits"));
    console.log(fruits);
  }, [products]);
  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
        // breakpoints={{
        //   320: {
        //     slidesPerView: 1,
        //     spaceBetween: 20,
        //   },
        //   // when window width is >= 480px
        //   480: {
        //     slidesPerView: 2,
        //     spaceBetween: 30,
        //   },
        //   // when window width is >= 640px
        //   640: {
        //     slidesPerView: 1,
        //     spaceBetween: 40,
        //   },
        // }}
      >
        {fruits &&
          fruits.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
