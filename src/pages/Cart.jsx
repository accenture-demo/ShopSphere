import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart, getCardDetails , placeOrder } from "./../api/index";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { opensnackBar } from "./../redux/reducers/snackBarSlice";

const Cart = ({digitalData,currentUser}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cardNumber:"",
    expiryDate:"",
    cvv:"",
    cardHolderName:"",
  });


  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await getCardDetails(token).then((res) => {
      setProducts(res.data);
      setLoading(false);
      // console.log(products);
    });
  };

  
  const addCart = async (id) => {
    // console.log(id) ;
    const token = localStorage.getItem("krist-app-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        setReload(!reload);
        // console.log(res.data);
        // setProducts(res.data.user.cart)
        if(res.data)  getProducts();
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          opensnackBar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const removeCart = async (id, quantity, type) => {
    const token = localStorage.getItem("krist-app-token");
    let qnt = quantity > 0 ? 1 : null;
    if (type === "full") qnt = null;
    await removeFromCart(token, {
      productId: id,
      quantity: qnt,
    })
      .then((res) => {
        setReload(!reload);
        if(res.data)  getProducts() ;
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          opensnackBar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const TotalAmount = () => {
    return products.reduce(
      (total, item) => total + item.quantity * item?.product?.price?.org,
      0
    );
  };

  useEffect(() => {
    getProducts();
  }, []);


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
    // getProducts();
    // console.log(products)
    setDigitalData();
    digitalData.product = products ;
  }, [products]);

  const convertAddressToString = (addressObj) => {
    // Convert the address object to a string representation
    return `${addressObj.name} ${addressObj.phone}, ${addressObj.address}, ${addressObj.emailAddress}`;
  };


  
  const PlaceOrderFunction = async (e) => {
    //  e.preventDefault();
    setButtonLoad(true);
    try {
      const isDeliveryDetailsFilled =
        formData.name &&
        formData.email &&
        formData.address&&
        formData.phone&& 
        formData.cardHolderName&&
        formData.cvv&&
        formData.expiryDate&&
        formData.cardNumber ;

      if (!isDeliveryDetailsFilled) {
        // Show an error message or handle the situation where delivery details are incomplete
        alert("enter details correctly") ;
        dispatch(
          opensnackBar({
            message: "Please fill in all required delivery details.",
            severity: "error",
          })
        );
        return;
      }
      // console.log("_________11111111111111111111111111") ;
      
      const token = localStorage.getItem("krist-app-token");
      const totalAmount = TotalAmount();

      // console.log("_________________________2222222222222222222222222") ;
      
      // console.log(orderDetails);
      
      await placeOrder(token, {
        products,
        address: formData.address,
        totalAmount,
      });

      // Show success message or navigate to a success page
      dispatch(
        opensnackBar({
          message: "Order placed successfully",
          severity: "success",
        })
      );
      setButtonLoad(false);
      // Clear the cart and update the UI
      // setReload(!reload);
      
    } catch (error) {
      // Handle errors, show error message, etc.
      dispatch(
        opensnackBar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        })
      );
      setButtonLoad(false);
    }
   };

    // form handle functions ---------------------------------------------------------------------
  

  
    // Function to handle input changes
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
  
    // table functions ---------------------------------------------------------------------------------
  

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity >= 0) {
      const updatedProducts = [...products];
      updatedProducts[index].quantity = newQuantity;
      setProducts(updatedProducts);
    }
  };

  const calculateSubtotal = (price, quantity) => {
    // let x = TotalAmount();
    // console.log(x);
    return price * quantity;
  };



  return (

    <div className="min-h-screen">

      <h2 className="text-xl font-bold mb-4 text-center mt-10 text-gray-600 ">Cart Products</h2>

      {loading ? <CircularProgress/> :
      
        <>

        {products?.length === 0 ? <div className="text-center my-10 text-gray-500">Your Cart Is Empty </div> : <>
        
        
        
          {/* table details ----------------------------------------------------------------------- */}
          
          <div className="container mx-auto max-w-[90%] mt-10 rounded-md ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Product</th>
                    <th className="py-3 px-6 text-left">Price</th>
                    <th className="py-3 px-6 text-left">Quantity</th>
                    <th className="py-3 px-6 text-left">Subtotal</th>
                  </tr>
                </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {products?.map((item, index) => (
                      <tr key={item.product?.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <img src={item.product?.img} alt={item.product?.name} className="w-10 h-10 rounded-full mr-2" />
                            <div>
                              <div className="font-bold">{item.product?.title}</div>
                              <div className="text-gray-500">{item.product?.desc}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">₹{item.product?.price?.org}</td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <button
                              onClick={() => removeCart(item.product?._id,1)}
                              className="text-gray-500 focus:outline-none p-5 "
                            >
                              -
                            </button>
                            <span className="mx-2 border-gray-500 border px-3 py-1 rounded-md ">{item.quantity}</span>
                            <button
                              onClick={() => addCart(item.product?._id)}
                              className="text-gray-500 focus:outline-none p-5"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">₹{calculateSubtotal(item.product?.price?.org, item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>

              </table>
            </div>
          </div>


          {/* payment gatewayy-------------------------------------------------------------------- */}

          <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
              <form onSubmit={PlaceOrderFunction}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                  <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleInputChange} className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">Card Holder Name</label>
                  <input type="text" id="cardHolderName" name="cardHolderName" value={formData.cardHolderName} onChange={handleInputChange} className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="mt-6">
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Buy Now</button>
              </div>
            </form>
          </div>

          </> }

          </>
      }
    </div>
  )
}

export default Cart;
