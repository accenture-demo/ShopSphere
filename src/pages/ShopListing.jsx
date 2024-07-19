import React, { useEffect, useState } from "react";
import IndivisualProductCard from "../components/cards/IndivisualProductCard";
import styled from "styled-components";
import { category, filter } from "../utils/data";
import { CircularProgress, Slider } from "@mui/material";
import { getAllProducts } from "./../api/index";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";

const ShopListing = ({digitalData,currentUser}) => {
  const [products, setProducts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);

  // Search Products ----------------------------------------------------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  // let abc = "Women"
  // id[0].toUpperCase();
  // console.log(id) ;
  // console.log(typeof("abc")) ;
  // const category = id.charAt(0).toUpperCase() + id.slice(1);
  // console.log(category);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const getSimilarProductsData = async () => {
    await getAllProducts(`categories=${id}`).then((res) => {
      setProducts(res.data);
      // console.log(res.data);
    });
  };


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
    // console.log("updated");
    setDigitalData();
  },[]);

  useEffect(() => {
    getSimilarProductsData();
  }, [category]);

  // pagination --------------------------------------------------------------------------

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const ProductToShow = products?.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="p-8 flex flex-col gap-8 bg-gray-100">
      {/* Filter details ------------------------------------------------ */}
      <div className="w-full">
          <div class="relative rounded-2xl">
            <div class="max-w-md">
                <input
                  type="search"
                  placeholder="search..."
                  onChange={handleSearch}
                  class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent stroke-gray-500  pl-12 pr-16 outline-none hover:w-full hover:cursor-text hover:border-lime-500 hover:pl-16 hover:pr-4"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="absolute mr-10 inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-hover:border-lime-500 peer-hover:stroke-lime-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
            </div>
          </div>
        </div>

      {/* Product details ------------------------------------------------ */}
      <div className="flex flex-wrap gap-10 mt-1 items-center justify-center">
        {products
          ?.filter((item) => {
            return searchTerm.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(searchTerm) ||
                  item.desc.toLowerCase().includes(searchTerm) ||
                  item.title.toLowerCase().includes(searchTerm);
          })
          .slice(firstPostIndex, lastPostIndex)
          .map((p) => (
            <IndivisualProductCard key={p.id} product={p} />
          ))}

        <div className=" block w-full mx-auto text-center ">
          <Pagination
            totalProduct={products}
            productPerPage={postPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopListing;
