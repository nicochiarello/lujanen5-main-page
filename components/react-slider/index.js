import { useRouter } from "next/router";
import React, { useRef } from "react";
import { formatDate } from "../../utils/format-date";
import Image from "next/image";
import SliderCard from "./SliderCard";

export const Slider = ({ category }) => {
  const router = useRouter();
  const referencia = useRef();
  const scrollLeft = () => {
    if (referencia.current.scrollLeft === 0) {
      referencia.current.scrollLeft =
        referencia.current.scrollWidth - referencia.current.clientWidth;
    } else {
      referencia.current.scrollLeft = referencia.current.scrollLeft - 294;
    }
  };
  const scrollRight = () => {
    if (
      referencia.current.scrollLeft >=
      referencia.current.scrollWidth - referencia.current.clientWidth
    ) {
      referencia.current.scrollLeft = 0;
    } else {
      referencia.current.scrollLeft = referencia.current.scrollLeft + 294;
    }
  };
  return (
    <section className="w-full h-fit bg-white px-3 relative py-2 md:py-4 rounded-lg">
      <div className="w-full text-[20px]  md:text-[calc(22px)] py-4 font-semibold">
        {category.title}
      </div>
      <div className="h-full flex items-center justify-center absolute top-0 left-0 z-20 ">
        <div
          onClick={() => scrollLeft()}
          className="flex items-center justify-center rounded-full  bg-gray-400 w-14 h-14 bg-opacity-30 backdrop-blur-lg drop-shadow-lg cursor-pointer hover:bg-opacity-50 transition-all hover:bg-gray-500"
        >
          <i className="bx bx-chevron-left text-[calc(32px)] text-white"></i>
        </div>
      </div>
      <div
        ref={referencia}
        className="w-full flex gap-3 overflow-x-scroll scroll-smooth scrollbar-hide py-1 md:py-4"
      >
        {category.blogs.map((i) => {
          return <SliderCard key={i.id} blog={i} />;
        })}
      </div>
      <div className="h-full flex items-center justify-center absolute top-0 right-0 z-20 px-1 ">
        <div
          onClick={() => scrollRight()}
          className="flex items-center justify-center rounded-full  bg-gray-400 w-14 h-14 bg-opacity-30 backdrop-blur-lg drop-shadow-lg cursor-pointer hover:bg-opacity-50 transition-all hover:bg-gray-500"
        >
          <i className="bx bx-chevron-right text-[calc(32px)] text-white"></i>
        </div>
      </div>
    </section>
  );
};

export default Slider;
