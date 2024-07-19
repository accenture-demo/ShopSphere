import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ShopListing from "./pages/ShopListing";
import Favourite from "./pages/Favourite";
import Cart from "./pages/Cart";
import { Footer } from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import { useSelector } from "react-redux";
import { useState } from "react";
import Authentication from "./pages/Authentication";
import ToastMessage from "./components/TosteMessage";
import Orders from "./pages/Orders";
import Category from "./pages/Category";

function App() {
  const [openAuth, setOpenAuth] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.snackBar);

  window.digitalData = {
    user: {},
    page: {},
    product: {}
  };

  return (
    <BrowserRouter>
      <div className="w-full flex flex-col bg-gray-100 text-gray-800 overflow-hidden">
        <Navbar openAuth={openAuth} setOpenAuth={setOpenAuth} currentUser={currentUser} digitalData={window.digitalData} />
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} digitalData={window.digitalData} />} />
          <Route path="/category" element={<Category currentUser={currentUser} digitalData={window.digitalData} />} />
          <Route path="/category/:id" element={<ShopListing currentUser={currentUser} digitalData={window.digitalData} />} />
          <Route path="/favourite" element={<Favourite currentUser={currentUser} digitalData={window.digitalData} />} />
          <Route path="/cart" element={<Cart currentUser={currentUser} digitalData={window.digitalData} />} />
          <Route path="/orders" element={<Orders currentUser={currentUser} digitalData={window.digitalData} />} />
          <Route path="/product/:id" element={<ProductDetails currentUser={currentUser} digitalData={window.digitalData} />} />
        </Routes>

        {openAuth && <Authentication openAuth={openAuth} setOpenAuth={setOpenAuth} currentUser={currentUser} />}
        {open && <ToastMessage open={open} message={message} severity={severity} />}

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
