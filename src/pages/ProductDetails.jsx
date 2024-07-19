import { React, useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import IndivisualProductCard from "../components/cards/IndivisualProductCard.jsx";
import { getProductDetails , getAllProducts } from "../api/index.js";
import {
  addToFavourites,
  removeFromFavorites,
  getFavouritesDetails,
  addToCart,
} from "./../api/index.js";
import { opensnackBar } from "./../redux/reducers/snackBarSlice.js";

const sizes = ["SM", "M", "L"];

export default function ProductDetails({digitalData,currentUser}) {
  const [selected, setSelected] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [category , setCategory] = useState() ;
  const [similarProducts , setSimilarProducts] = useState() ;

  const addFavorite = async () => {
    setFavoriteLoading(true);
    console.log(product._id);
    const token = localStorage.getItem("krist-app-token");
    if(!token){
      alert("Login to add to Favourite");
      return ;
    }
    await addToFavourites(token, { productId: product?._id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
        // console.log("added to fav");
        alert("added to favourite");
      })
      .catch((err) => {
        console.log("not added");
        setFavoriteLoading(false);
        dispatch(
          opensnackBar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const removeFavorite = async () => {
    setFavoriteLoading(true);
    // console.log(product._id);
    const token = localStorage.getItem("krist-app-token");
    await removeFromFavorites(token, { productId: product?._id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
        alert("removed from fav");
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          opensnackBar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const addCart = async () => {
    const token = localStorage.getItem("krist-app-token");
    if(!token){
      alert("Login to add");
      return ;
    }
    await addToCart(token, { productId: product?._id, quantity: 1 })
      .then((res) => {
        navigate("/cart");
      })
      .catch((err) => {
        dispatch(
          opensnackBar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const checkFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    if(!token){
      // alert("Login to add");
      return ;
    }
    await getFavouritesDetails(token, { productId: product?._id })
      .then((res) => {
        const isFavorite = res.data?.some(
          (favorite) => favorite._id === product?._id
        );

        // console.log(isFavorite);

        setFavorite(isFavorite);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          opensnackBar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };


  const getSimilarProductsData = async () => {
    // setLoading(true);
    // Call the API function for filtered products
    await getAllProducts(
      `categories=${category}`
    ).then((res) => {
      // let arr = [] ; 
      // res.data.map((acc,item)=>{
      //   if(item._id != product._id){
      //     arr.push(item) ;
      //   }
      //   // returnc ;
      // })
      setSimilarProducts(res.data);
      // similarProducts = similarProducts.filter(item => item._id !== product._id);
      
      // setLoading(false);
      // console.log(res.data);
      // console.log(category);
    });
  };

  useEffect(() => {
    checkFavourite();
  }, [favorite]);

  const getProduct = async (e) => {
    // e.preventDefault();
    await getProductDetails(id).then((res) => {
      setProduct(res.data);
      setCategory(res.data.category[0])
      // getSimilarProductsData();
      if(res.data){
        digitalData.product = res.data ;
      }
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
    setDigitalData();
    getProduct();
    
  }, []);

  useEffect(() => {
    getSimilarProductsData();
  },[category]);

  return (
    <div className="min-h-screen">

    
    <div className=" flex flex-col md:flex-row  m-auto justify-center  ">
      <div className="justify-center items-center m-auto text-center max-w-[50%] ">
        <img
          src={product?.img}
          alt=""
          className="mt-16 cover cursor-pointer items-center justify-center md:mb-16 rounded-md w-full md:w-[300px] h-auto md:h-[300px] object-cover"
        />
      </div>
      <div className="items-center justify-center text-left md:pr-40  ">
        <h1 className="md:mt-16 font-bold text-gray-700 text-2xl ">
          {product?.title}
        </h1>
        <h2 className="text-base my-5 text-gray-400">{product?.desc}</h2>
        <Rating value={3.5} sx={{ fontSize: "24px" }} />

        <div className="flex items-center gap-2">
          <div className="text-lg font-medium">₹ {product?.price.org}</div>
          <div className="text-secondary-60 line-through text-gray-500 p-5 ">
            {" "}
            ₹ {product?.price.mrp}
          </div>
          <div className="text-green-500 text-xs font-medium">
            {product?.price.off}% Off
          </div>
        </div>

        {product?.sizes.map((size) => (
          <span
            className={`border border-blue-400  rounded-full py-1 mr-3 cursor-pointer px-4 items-center justify-center 
                            ${
                              selected === size ? "bg-slate-400 text-white" : ""
                            }`}
            onClick={() => {
              setSelected(size);
            }}
          >
            {size}
          </span>
        ))}

        <div className="flex flex-row">
          <button
            className="px-5 py-2 mr-5 text-white bg-slate-400 hover:bg-gray-500 cursor-pointer rounded-md mt-10"
            onClick={() => addCart()}
          >
            Add To Cart
          </button>
          <button className="px-5 py-2 mr-5 text-white bg-green-400 hover:bg-green-500 cursor-pointer rounded-md mt-10"
            onClick={() => addCart()}>
            Buy Now
          </button>
          <button
            className="px-5 py-2 mr-5 text-white bg-slate-400 hover:bg-gray-500 cursor-pointer rounded-md mt-10"
            onClick={() => (favorite ? removeFavorite() : addFavorite())}
          >
            {favorite ? <>Remove From Favourite</> : <>Add To Favourite</>}
          </button>
        </div>

        <div className="">
          <button></button>
        </div>
      </div>


    </div>
        
        <h1 className="text-2xl text-cyan-600  ml-20 font-bold mt-4 ">Similar Products</h1>
        <div className="flex flex-wrap gap-10 justify-center my-10 ">
        {similarProducts?.slice(0, 4).map((p, index) => {
          return p._id !== product._id &&  <IndivisualProductCard key={index} product={p} />
        })}
        
        </div>

    </div>
  );
}
