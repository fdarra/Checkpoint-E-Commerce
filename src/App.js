import React from "react";
import "./index.css";

import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MainShop from "./Pages/MainShop";
import CategoryShop from "./Pages/CategoryShop";
import SideBarMenu from "./components/SideBarMenu";
import BackImages from "./components/BackImages";
import ProductDetail from "./Pages/ProductDetail";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

const App = () => {
  return (
    <div>

  
      <NavBar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/MainShop" element={<MainShop/>}/> 
        <Route path="/CategoryShop/:gend/:catego" element={<CategoryShop/>} />
        <Route path="/ProductDetail/:_id/:gend/:catego" element={<ProductDetail/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Login" element={<Login/>} />
        {/*
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
};

export default App;
