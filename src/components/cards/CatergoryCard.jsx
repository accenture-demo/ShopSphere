import React from "react";
import "./category.css";
import { Link } from "react-router-dom";

const CatergoryCard = ({ props }) => {
  return (
    <div class="flex mt-16 mb-5 items-center justify-center bg-transparent pb-9" onClick={()=>window.location.replace(`/category/${props.name}`)}>
      <div class="group h-[200px] w-[300px] ">
        <div
          class="group relative rounded-xl mx-6 md:mx-0 cursor-pointer items-center justify-center overflow-hidden shadow-md "
          style={{ boxShadow: "0 0 10px var(--color-secondary)" }}
        >
          <div class="h-96 w-72 md:w-full md:h-80">
            <img
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-125 group-hover:blur-[1px]"
              src={props.img}
              alt=""
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
          <div class="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
            <h1 class="text-2xl font-bold mb-3 text-white font-poppins">
              {props.name}
            </h1>
            <p class="text-md max-h-12 line-clamp-3 font-poppins overflow-ellipsis overflow-hidden text-white">
              {props.desc}
            </p>
            <div className="team-home-div-textArea mt-10">
              <Link
                to={`/category/${props.name}`}
                className="team-home-all before:top-4 before:h-8"
              >
                <span className="text-white">See More</span>
                <p id="teamMore" className="text-white">{" >>"}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatergoryCard;
