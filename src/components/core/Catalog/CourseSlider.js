import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Course_Card from "./Course_Card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, Navigation, FreeMode, Pagination } from "swiper/modules";

const CourseSlider = ({ courses }) => {
  //   console.log("courses", courses);
  console.log("inside slider");
  return (
    <div>
      {courses.length ? (
        <Swiper
          slidesPerView={1}
          breakpoints={{
            620: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation, FreeMode, Pagination]}
        >
          {courses?.map((item, index) => {
            return (
              <SwiperSlide className="">
                <Course_Card key={index} course={item}></Course_Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p>No Course found</p>
      )}
    </div>
  );
};

export default CourseSlider;
