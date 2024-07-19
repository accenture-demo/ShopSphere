import React, { useState } from "react";
import LogoImg from "../utils/Images/Logo.jpg";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import { FavoriteBorder, MenuRounded, ShoppingCartOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice.js";

const Navbar = ({ openAuth, setOpenAuth, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="bg-black sticky top-0 z-10 h-20 flex items-center justify-between px-6">
      <div className="flex items-center">
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "white" }} />
        </div>
        <div className="flex items-center text-white font-medium text-lg">
          <img src={LogoImg} alt="Logo" className="h-8 mr-2" />
          <NavLink to="/" className="text-white">ShopSphere</NavLink>
        </div>
      </div>

      <ul className="hidden md:flex items-center space-x-8">
        <li><NavLink to="/" className="text-white hover:text-purple-500">Home</NavLink></li>
        <li><NavLink to="/Category" className="text-white hover:text-purple-500">Category</NavLink></li>
        <li><NavLink to="/Orders" className="text-white hover:text-purple-500">Orders</NavLink></li>
        <li><NavLink to="/Contact" className="text-white hover:text-purple-500">Contact</NavLink></li>
      </ul>

      {isOpen && (
        <ul className="flex flex-col items-start gap-4 absolute top-20 right-0 w-80 p-4 bg-gray-800 rounded-md shadow-lg">
          <li><NavLink to="/" onClick={() => setIsOpen(false)} className="text-white">Home</NavLink></li>
          <li><NavLink to="/Category" onClick={() => setIsOpen(false)} className="text-white">Category</NavLink></li>
          <li><NavLink to="/Orders" onClick={() => setIsOpen(false)} className="text-white">Orders</NavLink></li>
          <li><NavLink to="/Contact" onClick={() => setIsOpen(false)} className="text-white">Contact</NavLink></li>
          {currentUser ? (
            <Button text="Logout" small onClick={() => dispatch(logout())} />
          ) : (
            <div className="flex gap-3">
              <Button text="Sign Up" outlined small onClick={() => setOpenAuth(!openAuth)} />
              <Button text="Sign In" small onClick={() => setOpenAuth(!openAuth)} />
            </div>
          )}
        </ul>
      )}

      <div className="hidden md:flex items-center gap-4">
        {currentUser ? (
          <>
            <NavLink to="/favourite" className="text-white"><FavoriteBorder sx={{ fontSize: 28 }} /></NavLink>
            <NavLink to="/cart" className="text-white"><ShoppingCartOutlined sx={{ fontSize: 28 }} /></NavLink>
            <Avatar src={currentUser?.img} sx={{ fontSize: 28 }}>
              {currentUser?.name[0]}
            </Avatar>
            <button className="text-white" onClick={() => dispatch(logout())}>Logout</button>
          </>
        ) : (
          <Button text="Sign In" small onClick={() => setOpenAuth(!openAuth)} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
