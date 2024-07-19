import {React,useEffect,useState} from "react";
import { Rating } from "@mui/material";
import { FavoriteRounded, AddShoppingCartOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { addToFavourites,removeFromFavorites ,getFavouritesDetails,addToCart} from "../../api/index";
import { opensnackBar } from "../../redux/reducers/snackBarSlice";
import { useDispatch } from "react-redux";

const IndivisualProductCard = ({product}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const addFavorite = async () => {
    setFavoriteLoading(true);
    // console.log(product._id);
    const token = localStorage.getItem("krist-app-token");
    await addToFavourites(token, { productId: product?._id  })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
        // console.log("added to fav")
      })
      .catch((err) => {
        // console.log("not added")
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
        // console.log("removed from fav")
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
    // console.log("error from product") ;
    const token = localStorage.getItem("krist-app-token");
    // console.log(token) ;
    if(token){
      await getFavouritesDetails(token, { productId: product?._id })
        .then((res) => {
          const isFavorite = res.data?.some(
            (favorite) => favorite._id === product?._id
          );
  
          // console.log(isFavorite) ;
  
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
    }
  };

  useEffect(()=>{
    checkFavourite();
  },[favorite]) ;

  return (
    <div className="w-64 flex flex-col gap-2 transition-all duration-300 ease-out cursor-pointer  ">
      <div className="relative rounded-md overflow-hidden group ">
        <img
          src={product?.img}
          className="w-full h-72 rounded-md object-cover hover:scale-125 transition duration-500 ease-out hover:opacity-50"
          onClick={() => window.location.replace(`/product/${product._id}`)}
          alt="Product"
        />

        <div className="absolute invisible group-hover:visible top-2 right-2 z-10 flex flex-col gap-2  ">

          {favorite? (
            <div className="rounded-full w-10 h-10 bg-gray-400 flex items-center justify-center z-10 " onClick={()=> favorite ? removeFavorite() : addFavorite() }>
            <FavoriteRounded className="text-red-500 z-10 " sx={{ fontSize: "20px" }} />
          </div>
          ) : (
            <div className="rounded-full w-10 h-10 bg-gray-400 flex items-center justify-center z-10 "  onClick={()=> favorite ? removeFavorite() : addFavorite() }>
            <FavoriteRounded className=" z-10 " sx={{ fontSize: "20px" }} />
          </div>
          )}
          

          <div className="rounded-full w-10 h-10 bg-white flex items-center justify-center" onClick={()=> addCart()}>
            <AddShoppingCartOutlined sx={{ color: "inherit", fontSize: "20px" }} />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 z-10 bg-white px-2 py-1 rounded-md flex items-center opacity-90">
          <Rating value={3.5} sx={{ fontSize: "14px" }} />
        </div>
      </div>
      <div className="flex flex-col gap-1 p-2" onClick={() => window.location.replace(`/product/${product._id}`)}>
        <div className="text-lg font-semibold text-primary">{product?.title}</div>
        <div className="text-primary text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
          {product?.desc}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-lg font-medium">₹{product?.price.org}</div>
          <div className="text-secondary-60 line-through text-gray-400">₹{product?.price.mrp}</div>
          <div className="text-green-500 text-xs font-medium">{product?.price.off}% Off</div>
        </div>
      </div>
    </div>
  );
};

export default IndivisualProductCard;
