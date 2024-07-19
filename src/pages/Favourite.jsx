import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { getFavouritesDetails } from "./../api/index";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { opensnackBar } from "./../redux/reducers/snackBarSlice";
import { DeleteOutline } from "@mui/icons-material";
import IndivisualProductCard from './../components/cards/IndivisualProductCard'

const Favourite = ({digitalData,currentUser}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await getFavouritesDetails(token).then((res) => {
      setProducts(res.data);
      setLoading(false);
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
  
  useEffect(()=>{
    setDigitalData();
    getProducts();
  },[])




  useEffect(()=>{
    digitalData.product = products ;
  },[products]) ;

  return (
    <div className="min-h-screen">
      <div className='text-2xl justify-center font-bold text-gray-700 mt-10 text-center'>Favourite Products</div>      
      <div className='flex flex-wrap p-5 justify-around rounded-md'>

        {products?.map((product) =>(
          <IndivisualProductCard product={product}/>

        ))}
      </div>
    </div>
  )
}

export default Favourite