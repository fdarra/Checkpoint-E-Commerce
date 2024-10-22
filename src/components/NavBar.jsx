import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import log0 from "../images/log0.png";

import SideBarMenu from "./SideBarMenu";
import { Sidebar } from "primereact/sidebar";

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { logout } from "../JS/Actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import CartList from "./CartList";
import {
  getCartFromStorage,
  getWishesFromStorage,
} from "../JS/Actions/Cart_wishes_ListActions";
import WishesList from "./WishesList";

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/profile" },
  { name: "Sign out", href: "/" },
];

const NavBar = () => {
  const [visibleRight, setVisibleRight] = useState(true);
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [viewBox, setViewBox] = useState();
  const [selectedField, setSelectedField] = useState("cart");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.AuthReducer.user);
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);
  const cartItems = useSelector((state) => state.Cart_wishesListReducer.cart);
  const wishes = useSelector((state) => state.Cart_wishesListReducer.wishes);

  useEffect(() => {
    dispatch(getCartFromStorage);
    dispatch(getWishesFromStorage);
  }, [dispatch, cartItems]);

  return (
    <>
      <div className="fixed w-full z-50 backdrop-blur-sm bg-black/30  text-white hover:backdrop-blur-xl mx-0  transition-colors duration-300">
        <div className="mx-auto px-2 sm:px-6 lg:px-8 w-full ">
          <div className="relative flex h-16 w-full items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
            <div className="flex justify-between w-full ">
              <div className="relative  flex justify-start items-center  w-[40%]   bg-transparent">
                <div className="absolute  ">
                  <SideBarMenu /> 
                </div>
              </div>
              <div className=" relative z-10 w-[20%] flex justify-center items-center content-center pt-1  bg-transparent">
                <div className=" absolute  items-center pt-3  ">
                  <img alt="Your Company" src={log0} className=" w-full object-cover object-center xl:pt-3" />
                </div>
              </div>
              <div className="relative w-[40%]  flex items-center gap-2 pt-1  lg:gap-7 lg:mr-0 pr-3 justify-end bg-transparent">
                {/* ///// search input */}
                <div className="static p-1">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="  max-w-md px-2 mx-auto hidden xl:block  "
                  >
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-[150px] h-6 py-3 pl-12 pr-4 text-gray-500 border rounded-full outline-none bg-transparent focus:bg-white focus:border-black"
                      />
                    </div>
                  </form>
                </div>
                {/* ///// Login*/}
                <div className="lg:flex flex ">
                  {!isAuth ? (
                    <Link
                      to="/login"
                      className="text-sm font-semibold leading-6 text-white hover:text-black"
                    >
                      Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                  ) : null}
                </div>

                {/* ///// menu */}
                <div className=" relative flex gap-4 items-center content-cente ">
                  {/* Profile menu */}
                  {isAuth && (
                    <>
                      <span>
                        <span className="text-xs font-thin mx-1">Hello,</span>
                        <Link to="/profile" className="text-xl font-semibold">
                          {user && user.name}
                        </Link>
                      </span>

                      <Menu as="div" className="relative  ">
                        <div>
                          <MenuButton className=" pt-0 rounded-full bg-transparent flex  items-center content-center  hover:text-gray-400 text-white ">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                              />
                            </svg>
                          </MenuButton>
                        </div>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                              <Link
                                to={item.href}
                                onClick={
                                  item.name === "Sign out"
                                    ? () => dispatch(logout())
                                    : null
                                }
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                              >
                                {item.name}
                              </Link>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </Menu>
                    </>
                  )}
                </div>
                {/* ///// Cart */}
                <button
                  type="button"
                  className="relative rounded-full bg-transparent p-1  hover:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <div className="relative ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 z-40"
                      onClick={() => {
                        setVisibleRight(!visibleRight);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <span
                      className={`${
                        cartItems.length > 0
                          ? "absolute -top-2 z-10 -right-4  inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"
                          : "hidden"
                      }`}
                    >
                      {cartItems.length}
                      {/* Nombre d'articles dans le panier */}
                    </span>
                    <span
                      className={`${ wishes.length >0
                          ? "absolute block translate-x-4 -translate-y-2 "
                          : "hidden"
                      }`}
                    >
                 <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323"><path d="m480-144-50-45q-100-89-165-152.5t-102.5-113Q125-504 110.5-545T96-629q0-89 61-150t150-61q49 0 95 21t78 59q32-38 78-59t95-21q89 0 150 61t61 150q0 43-14 83t-51.5 89q-37.5 49-103 113.5T528-187l-48 43Z"/></svg>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" ">
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
          className="bg-trensparent text-white w-screen xl:w-[410px]  pt-16 pb-2 pl-1 pr-2 "
          showCloseIcon={false}
        >
          {/* sidebar */}

          <div className="relative bg-white  object-cover w-full h-full rounded-t-3xl flex-col overflow-hidden  ">
            {/* Shop cart */}
            <div className=" relative pt-0 ">
              <ButtonGroup>
                <Button
                  label="Cart"
                  icon="pi pi-check"
                  className={
                    selectedField === "cart"
                      ? "bg-white  border-b-2 border-black    text-black font-semibold  w-1/3 rounded-tl-3xl p-5 drop-shadow-3xl  shadow-black"
                      : "bg-slate-100  text-black font-semibold w-1/3 rounded-tl-3xl p-5 drop-shadow-3xl  shadow-black"
                  }
                  value="Cart"
                  onClick={(e) => {
                    setSelectedField("cart");
                  }}
                />

                <Button
                  label="Wishlist"
                  icon="pi pi-check"
                  className={
                    selectedField === "Wishlist"
                      ? " bg-white border-b-2 border-black    text-black font-semibold w-1/3 p-5 drop-shadow-3xl  shadow-black"
                      : "bg-slate-100  text-black font-semibold w-1/3 p-5 drop-shadow-3xl  shadow-black "
                  }
                  value="Wishlist"
                  onClick={(e) => {
                    setSelectedField("Wishlist");
                  }}
                />

                <Button
                  label="Cancel"
                  icon="pi pi-check"
                  className={
                    selectedField === "Cancel"
                      ? " bg-white border-b-2 border-black    text-black font-semibold w-1/3 p-5 drop-shadow-3xl  shadow-black"
                      : "bg-slate-100  text-black font-semibold w-1/3 p-5 drop-shadow-3xl  shadow-black "
                  }
                  value="Cancel"
                  onClick={(e) => {
                    setSelectedField("Cancel");
                  }}
                />
              </ButtonGroup>
            </div>

            <div className={`${selectedField === "cart" ? "block object-cover w-full h-full" : "hidden"}`}>
              <CartList />
            </div >
            <div  className={`${selectedField === "Wishlist" ? "block object-cover w-full h-full" : "hidden"}`}>
              <WishesList/>
              
            </div>
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default NavBar;
