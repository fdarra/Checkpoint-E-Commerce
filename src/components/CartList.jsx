import React, { useEffect, useState } from "react";
import minus from "../images/minus.png";
import plus from "../images/plus.png";
import like from "../images/like.png";
import edit from "../images/edit.png";
import delet from "../images/delet.png";
import { ScrollPanel } from "primereact/scrollpanel";
import { useDispatch, useSelector } from "react-redux";
import {
    addToWishesList,
  getCartFromStorage,
  getWishesFromStorage,
  removeFromCartList,
  removeFromWishesList,
} from "../JS/Actions/Cart_wishes_ListActions";
import { REMOVE_FROM_CART } from "../JS/Actiontypes/Cart_Wishes_ListActionTypes";

const CartList = () => {
  const [quantities, setQuantities] = useState({}); // Gérer les quantités par produit
  const dispatch = useDispatch();
  const cartlist = useSelector((state) => state.Cart_wishesListReducer.cart);
  const wishes= useSelector(
    (state) => state.Cart_wishesListReducer.wishes
  );

  useEffect(() => {
    dispatch(getCartFromStorage());
    dispatch(getWishesFromStorage());
  }, [dispatch]);

  // Lorsque le panier est chargé, initialisez les quantités
  useEffect(() => {
    const initialQuantities = {};
    cartlist.forEach((item) => {
      initialQuantities[item._id] = 1; // Quantité initiale de chaque produit à 1
    });
    setQuantities(initialQuantities);
  }, [cartlist]);

  const handleIncrement = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item._id]: (prevQuantities[item._id] || 1) + 1, // Incrémenter la quantité pour ce produit
    }));
  };

  const handleDecrement = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item._id]: Math.max(1, (prevQuantities[item._id] || 1) - 1), // Ne pas descendre en dessous de 1
    }));
  };
  return (
    <div>
      <ScrollPanel className="w-full xl:h-[500px] h-[400px] bg-white px-0">
        {cartlist.map((item, key) => (
          <div className="border-b-2 border-slate-200 flex bg-white p-0 m-0  ">
            <div className="bg-white w-1/3 h-[200px] flex-col object-cover object-center">
              <img src={item.image} alt="key" className="w-full h-full" />
            </div>

            <div className="w-2/3 h-[200px] bg-white">
              <h1 className="text-start pl-4 font-semibold text-wrap text-black text-base mt-1 pr-1">
                {item.title}
              </h1>
              <h1 className=" pl-4 text-lg text-black font-semibold">
                ${item.price}
              </h1>
              <div className="flex mt-2 justify-start pl-4">
                <button
                  className=" border-2 rounded-l-lg border-slate-200 hover:bg-slate-200"
                  onClick={(e) => handleDecrement(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000000"
                  >
                    <path d="M200-440v-80h560v80H200Z" />
                  </svg>
                </button>
                <label className="px-2 text-black font-mono font-semibold text-base ">
                  {quantities[item._id] || 1}{" "}
                  {/* Affiche la quantité spécifique à chaque produit */}
                </label>
                <button
                  className=" border-2 rounded-r-lg border-slate-200 content-center hover:bg-slate-200"
                  key={key}
                  onClick={(e) => {
                    handleIncrement(item);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000000"
                  >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                  </svg>
                </button>
              </div>
              <div className="flex mt-2 justify-center items-center contents-center">
                <section
                  className={`w-1/3 pt-2 h-10 pl-1 border-r-2 ${
                    item.countInStock ? "text-green-600" : "text-red-600"
                  } border-slate-200`}
                >
               
                {item.countInStock ? "In Stock":"exhausted"}  
                </section>

                <section className="w-1/3  pt-2  h-10 pl-1 border-r-2 text-center  text-black border-slate-200">
                 {item.size}
                </section>
                <section className="w-1/3  pt-2  text-black h-10 pl-1 text-center ">
                  {item.color}
                </section>
              </div>
              <div className="flex justify-end pr-2 mt-2">
                <button
                 className="p-1 rounded-full bg-slate-50 mx-2 cursor-pointer  hover:bg-red-400 "
                onClick={(e)=>{dispatch(addToWishesList(item,wishes))
                    dispatch(removeFromCartList(item._id,cartlist))
                }}
                >
                
                  <img src={like} alt="like" className="w-5 h-5  " />
                </button>
                <button className="p-1 rounded-full bg-slate-50 mx-2 cursor-pointer  hover:bg-slate-200">
                  <img src={edit} alt="edit" className="w-5 h-5  " />
                </button>
                <button
                 className="p-1 rounded-full bg-slate-50 mx-2 cursor-pointer  hover:bg-slate-200"
                 onClick={(e)=>{dispatch(removeFromCartList(item._id,cartlist))}}>
                  <img src={delet} alt="delet" className="w-5 h-5 " />
                </button>
              </div>
            </div>
          </div>
        ))}
      </ScrollPanel>

      <div>
        <div className="flex justify-between pt-1">
          <section className="w-full">
            <label className="py-4">total</label>
          </section>
          <section className="">
            <label className="py-4">total</label>
          </section>
        </div>
        <div className="w-full flex justify-center items-end h-full bg-white bottom-0">
          <button className="py-3 text-black bg-gray-500 px-36 rounded-lg ">
            validate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
