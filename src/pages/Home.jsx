import { React, useEffect, useState } from "react";
import CarouselCustomArrows from "../components/HomeCrousal";
import IndivisualProductCard from "../components/cards/IndivisualProductCard";
import { getAllProducts } from "./../api/index.js";
import { Link } from "react-router-dom";

const Home = ({ digitalData , currentUser }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // console.log(products) ;

  // will call getProduct function once after page loaded


  function setDigitalData() {
    // console.log("digital Data called");
    try {
      digitalData.page = {
        pageUrl: window.location.href,
        title: document.title,
      };
      digitalData.product = {};
      if (currentUser) {
        digitalData.user = {
          userDetails: {
            userId: currentUser._id,
          },
          loggedIn: true,
        };
      } else {
        digitalData.user = {
          userDetails: null,
          loggedIn: false,
        };
      }

      // console.log(digitalData);
    } catch (e) {
      console.error(e);
    }
  }
  
  useEffect(() => {
    getProducts();
    setDigitalData();
    // digitalDataConfigure();
  }, []);

  return (
    <div>
      <CarouselCustomArrows />

      <div className="flex w-full items-center text-center font-bold text-2xl mt-10 justify-center text-zinc-500 ">
        BestSeller
      </div>
      <div className="flex flex-wrap gap-10 mt-8 items-center justify-center">
        {products.slice(0, 4).map((p, index) => (
          <IndivisualProductCard key={index} product={p} />
        ))}
      </div>

      <Link to="/category">
        <div className="items-center justify-center my-10 text-center mx-auto ">
          <button class="relative group overflow-hidden justify-center mx-auto px-6 h-12 rounded-full flex space-x-2 items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600">
            <span class="relative text-sm text-white">See All Categories</span>
            <div class="flex items-center -space-x-3 translate-x-3">
              <div class="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Home;
