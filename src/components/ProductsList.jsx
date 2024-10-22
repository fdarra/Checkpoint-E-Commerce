import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../JS/Actions/ProductActions";
import { ScrollPanel } from "primereact/scrollpanel";

const ProductsList = () => {
  const dispatch = useDispatch();
  const Products = useSelector((state) => state.ProductReducer.products);

  useEffect(() => {
    dispatch(getProducts());
    console.log(Products);
  }, [dispatch]);

  return (
    <div className=" overflow-hidden w-full flex  justify-center items-start  ">
      <div className="w-2/3 z-30 justify-center   bg-black/50 h-screen shadow-white  shadow-2xl  ">
        <ScrollPanel className=" w-full h-screen  z-40">
          <div className="card  ">
            <div className="bg-black/50 ">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {Products.map((product) => (
                    <a key={product.id} href={""} className="group">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img
                          alt={product.title}
                          src={product.image}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-50">
                        {product.title}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-100">
                        ${product.price}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollPanel>
      </div>
    </div>
  );
};

export default ProductsList;

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
