import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";


const images = [
  {
    img: "https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    name: "Branded",
    desc: "LAPTOP",
  },
  {
    img: "https://images.pexels.com/photos/10506575/pexels-photo-10506575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    name: "wireless",
    desc: "HEADPHONE",
  },
  {
    img: "https://images.pexels.com/photos/56904/pexels-photo-56904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    name: "brand new",
    desc: "GOOGLE PIXEL",
  },
];

export default function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 3000);
    return () => clearInterval(timer);
  }, [goToNext]);

  return (
    <div className="relative h-[250px] w-full  m-auto overflow-hidden [clip-path: polygon(0 0, 100% 0, 100% 100%, 0 79%)]">
      <div className="absolute top-1/3 left-4 z-10 mx-10 [clip-path: polygon(0 0, 100% 0, 100% 100%, 0 79%)]">
        <button
          onClick={goToPrevious}
          className="bg-transparent text-black p-2 rounded-full"
        >
          &#10094;
        </button>
      </div>
      <div className="absolute top-1/3 right-4 z-10 mx-10 ">
        <button
          onClick={goToNext}
          className="bg-transparent textransparent-black p-2 rounded-full"
        >
          &#10095;
        </button>
      </div>
      {images.map((item, index) => (
        <div key = {index}>
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-500 ease-in-out [clip-path: polygon(0 0, 100% 0, 100% 100%, 0 79%)]"
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              // width: "100vw",
              // height: "100%",
              transform: `translateX(${100 * (index - currentIndex)}%)`,
              className: "[clip-path: polygon(0 0, 100% 0, 100% 100%, 0 79%);]",
            }}
          >
            {/* <div className="z-10 absolute top-2 right-32 text-2xl font-extrabold text-white ">Beats to</div> */}
            <div key={index} className="z-10 absolute top-10 right-32 text-4xl font-extrabold text-white ">
              {item.name}
            </div>
            <div className=" z-10 absolute top-24 mb-5 right-32 text-7xl font-extrabold text-gray-300  ">
              {item.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
