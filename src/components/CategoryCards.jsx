/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import CategoryCard from "./CategoryCard";
import CategorySkeleton from "./CategorySkeleton";
import logoImage from "../assets/cake_logo.png";

export default function CategoryCards({ categories, loading, handleCategoryData, setHandleCategoryData }) {
  function handleCategory(value) {
    setHandleCategoryData(value);
  }
  let defaultCategory = { image: { secure_url: logoImage }, title: "Barchasi" };

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        modules={[Autoplay]}
        loop={true}
        className="categorySwiper mt-6 mb-3"
      >
        <SwiperSlide>
          <div onClick={() => handleCategory("")}>
            <CategoryCard handleCategory={handleCategoryData === ""} category={defaultCategory} />
          </div>
        </SwiperSlide>
        {categories.length && !loading
          ? categories.map((val) => {
              return (
                <SwiperSlide key={val._id}>
                  <div onClick={() => handleCategory(val.title)}>
                    <CategoryCard handleCategory={handleCategoryData === val.title} category={val} />
                  </div>
                </SwiperSlide>
              );
            })
          : loading
          ? new Array(4).fill(0).map((val, i) => {
              return (
                <SwiperSlide key={i}>
                  <CategorySkeleton />
                </SwiperSlide>
              );
            })
          : ""}
      </Swiper>
    </>
  );
}
