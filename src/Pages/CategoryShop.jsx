import React, { useEffect, useState } from "react";
import BackImages from "../components/BackImages";
import { ScrollPanel } from "primereact/scrollpanel";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSizes,
  getColors,
  getProductsByGC,
  getProductsByGC_DT,
} from "../JS/Actions/ProductActions";
import { Link, useParams } from "react-router-dom";
import {
  addToCartList,
  addToWishesList,
  clearWishesList,
  getCartFromStorage,
  getWishesFromStorage,
} from "../JS/Actions/Cart_wishes_ListActions";
import SizesList from "../components/SizesList";
import ProgressLoad from "../components/ProgressLoad";

const CategoryShop = () => {
  const [types, setTypes] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [like, setLike] = useState(false);
  const [sizesList, setSizesList] = useState([]);

  const [selectedSizes, setSelectedSizes] = useState({}); // État pour stocker les tailles par produit
  const { gend, catego } = useParams();
  const [productsFiltredBytype, setProductsFiltredBytype] = useState([]);
  const [svgvisible, setsvgVisible] = useState(false);
  const [sizes, setSizes] = useState([]);
  const dispatch = useDispatch();
  const ProductsByGC = useSelector(
    (state) => state.ProductReducer.productsByGC
  );
  const productsByGC_DT = useSelector(
    (state) => state.ProductReducer.productsByGC_DT
  );
  const Load = useSelector((state) => state.ProductReducer.load);
  // const Sizes = useSelector((state) => state.ProductReducer.sizes);
  const Cart = useSelector((state) => state.Cart_wishesListReducer.cart);
  const Wishes = useSelector((state) => state.Cart_wishesListReducer.wishes);
  const user = useSelector((state) => state.AuthReducer.user);
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);

  const titles_sizes = useSelector((state) => state.ProductReducer.allSizes);

  useEffect(() => {
    if (gend && catego) {
      dispatch(getProductsByGC(gend, catego));
      dispatch(getProductsByGC_DT(gend, catego));
      dispatch(getAllSizes());
      dispatch(getCartFromStorage())
      dispatch(getWishesFromStorage())

      
    }
  }, [dispatch, gend, catego]);

  useEffect(() => {
    if (productsByGC_DT.length > 0) {
      setProductsFiltredBytype(productsByGC_DT);
      setTypes(
        productsFiltredBytype.reduce((acc, obj) => {
          if (!acc.includes(obj.type)) {
            acc.push(obj.type);
          }
          return acc;
        }, [])
      );
    }
    setCart(Cart)
    setSizes(titles_sizes);
  }, [productsByGC_DT]);

  const handleClickType = (type) => {
    if (type === "ALL") {
      setProductsFiltredBytype(productsByGC_DT);
    } else {
      setProductsFiltredBytype(
        productsByGC_DT.filter((product) => product.type === type)
      );
    }
  
  };

  const handleSizeSelection = (productId, size) => {
    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [productId]: size, // Mise à jour de la taille uniquement pour ce produit
    }));
  };

  return (
    <BackImages>
      
      <div className="overflow-hidden w-full flex justify-center">
        <div className="w-2/3 z-30 justify-center bg-black/50 h-screen shadow-white shadow-2xl">
          <ScrollPanel className="h-[100%] content-baseline z-40">
            <div className="card w-full h-screen xl:pt-10">
              <div className="object-cover bg-black/50 w-full min-h-screen">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                  <h2 className="sr-only">Products</h2>

                  <div className="grid z-20 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    { 
                    productsFiltredBytype.map((product) => (
                      <div key={product._id}>
                        <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                          <div className=" relative flex flex-col z-30 group">
                            <Link
                              to={`/ProductDetail/${product._id}/${gend}/${catego}`}
                              className=" z-30 group"
                            >
                              <img
                                alt={product.title}
                                src={product.image}
                                className="z-10 h-full w-full object-cover object-center group-hover:opacity-75 "
                              />
                            </Link>
                          </div>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-50">
                          {product.title}
                        </h3>

                        <div className="flex mt-2 items-center gap-3  ">
                          <p className=" text-2xl font-medium text-gray-100">
                            ${product.price}
                          </p>
                          <svg
                          className="cursor-pointer hover:bg-red-700"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#FFFFFF"
                            onClick={(e)=>{dispatch(addToWishesList(product,Wishes))
                      
                            }}
                          >
                            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                          </svg>
                        </div>
                        <div>
                          {Load && !sizes ? (
                            <ProgressLoad /> // Affichage du loader pendant le chargement
                          ) : (
                            <ul className="flex">
                              
                              {Array.isArray(sizes) &&
                              sizes
                                .filter(
                                  (element) => element.title === product.title
                                )
                                .map((item, index) => (
                                  <li
                                    key={index}
                                    className={`p-1 text-center text-sm cursor-pointer hover:bg-black/30 hover:rounded-full hover:text-lg text-white ${
                                      selectedSizes[product._id] === item.size
                                        ? "bg-white/30 text-black border-black border-1 rounded-full"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      handleSizeSelection( product._id,item.size   );
                                    }}
                                  >
                                    {item.size}
                                    {/* Ajout des deux icônes SVG */}
                                    {selectedSizes[product._id] ===
                                      item.size && (
                                      <div className="flex mt-2 justify-items-center gap-3 animate-bounce">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          height="22px"
                                          viewBox="0 -960 960 960"
                                          width="24px"
                                          fill="#FFFFFF"
                                          className="mt-2 text-gray-100 cursor-pointer"
                                          onClick={(e) => {
                                            console.log(
                                              "Ajouté au panier :",
                                              product,
                                              item.size
                                            );
                                            dispatch(addToCartList({...product,size:item.size}, Cart)
                                            );
                                          }}
                                        >
                                          <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
                                        </svg>
                                      </div>
                                    )}
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollPanel>
        </div>
        <div className="fixed bottom-0 mb-7 xl:top-0 xl:mt-14 w-auto h-20 gap-2 z-50 flex justify-center items-center flex-wrap bg-transparent p-1">
          <button
            className="z-60 text-white text-wrap rounded-xl p-2 px-5 bg-red-700 hover:bg-red-950 hover:border-black border-2"
            value={"ALL"}
            onClick={(e) => handleClickType(e.currentTarget.value)}
          >
            ALL
          </button>

          {types.map((type, index) => (
            <button
              key={index}
              className="z-60 text-white text-wrap rounded-xl p-2 bg-red-700 hover:bg-red-950 hover:border-black border-2"
              value={type}
              onClick={(e) => handleClickType(e.currentTarget.value)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </BackImages>
  );
};

export default CategoryShop;
