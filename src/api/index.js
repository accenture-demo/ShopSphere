import axios from 'axios'

// create an api instance 
const API = axios.create({
    baseURL:"https://e-commerce-backend-bb6k.onrender.com/api/",
    // baseURL:"http://localhost:8000/api/",
    // baseURL:"https://e-commerce-project-one-vert.vercel.app/",
});


// User Auth integrations---------------------------------

export const UserSignUp = async (data) => await API.post("user/signup", data) ;
export const UserSignIn = async (data) => await API.post("user/signin", data) ;


// Product view integrations---------------------------------

export const getAllProducts = async (filter) => await API.get(`/product?${filter}`) ;
export const getProductDetails = async (id) => await API.get(`/product/${id}`) ;


// Cart integrations---------------------------------

export const getCardDetails = async (token) =>
    await API.get("/user/cart" , {
    headers : { Authorization : `Bearer ${token}` } ,
})
export const addToCart = async (token,data) =>
    await API.post("/user/cart" ,data, {
    headers : { Authorization : `Bearer ${token}` } ,
})
export const removeFromCart = async (token,data) =>
    await API.patch("/user/cart" ,data, {
    headers : { Authorization : `Bearer ${token}` } ,
})


export const getFavouritesDetails = async (token) =>
    await API.get(`/user/favourite`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  export const addToFavourites = async (token, data) =>
    await API.post(`/user/favourite/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  export const removeFromFavorites = async (token, data) =>
    await API.patch(`/user/favourite/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
// Order integrations---------------------------------

export const placeOrder = async (token,data) =>
    await API.post("/user/order/" , data ,{
    headers : { Authorization : `Bearer ${token}` } ,
})
export const getAllOrders = async (token) =>
    await API.get("/user/order/"  , {
    headers : { Authorization : `Bearer ${token}` } ,
})