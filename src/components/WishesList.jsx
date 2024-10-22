import React, { useEffect } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartList,
  getCartFromStorage,
  getWishesFromStorage,
  removeFromWishesList,
} from "../JS/Actions/Cart_wishes_ListActions";
import Spinner from "./Spinner";

const WishesList = () => {
  const dispatch = useDispatch();
  const WishesList = useSelector(
    (state) => state.Cart_wishesListReducer.wishes
  );
  const CartList = useSelector((state) => state.Cart_wishesListReducer.cart);

  useEffect(() => {
    dispatch(getCartFromStorage());
    dispatch(getWishesFromStorage());

  }, [dispatch]);

  return (
    <div className="relative w-full h-full">
  

      <ScrollPanel className=" absolute h-full w-full pb-10 ">
        <div className=" h-full w-full flex  items-center  flex-wrap m-0 p-0">
          {WishesList && WishesList.length > 0 ? (
            WishesList.map((item, key) =>
              // Vérification que "item" n'est pas null et a une propriété "image"
              item && item.image ? (
                <div
                  className=" flex flex-col bg-slate-200 w-1/2  h-[380px] p-0.5"
                  key={key} // Utilisation de "_id" ou de la clé par défaut
                >
                  <div className=" object-cover object-center  ">
                    <img
                      src={item.image}
                      alt={item._id} // Suppression des guillemets dans alt
                      className=" w-full h-[250px]"
                    />
                  </div>
                  <div className=" flex-col bg-white w-full h-full ">
                  <section>  <h1 className="text-black text-base text-left pl-1 pt-1 truncate">{item.title}</h1> </section>
                  <section> <h2  className="text-black text-base text-left font-medium pl-1 pt-1"> {item.price}$ </h2>  </section> 
                  
                  
                  <div className="flex justify-center  w-full h-full  ">
                
                    <button
                   className=" px-10 h-14   mt-2 text-black bg-white  text-center  rounded-md border-2 border-black hover:text-white hover:bg-black hover:border-white  "
                      onClick={(e) => {
                       if(WishesList && item && item._id )
                       
                        dispatch(removeFromWishesList(item._id, WishesList));
                         dispatch(addToCartList(item, CartList));
                      
                    
                    }}
                    >
                      Add to bag
                    </button>
                  </div>
                  </div>
                
                    
              
                </div>
              ) :" "
            )
          ) :  " "}
        </div>
      </ScrollPanel>
    </div>
  );
};

export default WishesList;
