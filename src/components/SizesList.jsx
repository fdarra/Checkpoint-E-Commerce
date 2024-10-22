// import React, { useEffect, useState } from "react";
// import { Radio, RadioGroup } from "@headlessui/react";
// import { useDispatch, useSelector } from "react-redux";
// import { getColors } from "../JS/Actions/ProductActions";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// const SizesList = ({ Product }) => {
//   const [selectedSize, setSelectedSize] = useState();
//   const dispatch = useDispatch();
//   const Sizes = useSelector((state) => state.ProductReducer.sizes);

//   useEffect(() => {
//     if (Product && Product.title) dispatch(getColors(Product.title));
//     if (!Sizes) setSelectedSize(Sizes[0]);
//     console.log("listsize:",Sizes)
//     console.log("listsizeproduct :");
//   }, [dispatch, Product]);

//   return (
//     <div>
//       <div className="mt-10">
//         <div className="flex items-center justify-between">
//           <h3 className="text-sm font-medium text-gray-900">Size</h3>
//           <a
//             href="#"
//             className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
//           >
//             Size guide
//           </a>
//         </div>

//         <fieldset aria-label="Choose a size" className="mt-4">
//           <RadioGroup
//             value={selectedSize}
//             onChange={setSelectedSize}
//             className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
//           >
//             {Sizes.map((size, i) => (
//               <Radio
//                 key={i}
//                 value={size}
//                 disabled={!Product.countInStock}
//                 className={classNames(
//                   Product.countInStock
//                     ? "cursor-pointer bg-white text-gray-900 shadow-sm"
//                     : "cursor-not-allowed bg-gray-50 text-gray-200",
//                   "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
//                 )}
//               >
//                 <span>{size}</span>
//                 {Product.countInStock ? (
//                   <span
//                     aria-hidden="true"
//                     className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
//                   />
//                 ) : (
//                   <span
//                     aria-hidden="true"
//                     className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
//                   >
//                     <svg
//                       stroke="currentColor"
//                       viewBox="0 0 100 100"
//                       preserveAspectRatio="none"
//                       className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
//                     >
//                       <line
//                         x1={0}
//                         x2={100}
//                         y1={100}
//                         y2={0}
//                         vectorEffect="non-scaling-stroke"
//                       />
//                     </svg>
//                   </span>
//                 )}
//               </Radio>
//             ))}
//           </RadioGroup>
//         </fieldset>
//       </div>
//     </div>
//   );
// };

// export default SizesList;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSizes, getColors } from "../JS/Actions/ProductActions";
import ProgressLoad from "./ProgressLoad";


const SizesList = ({ title }) => {
  const [sizes, setSizes] = useState([]);
  const titles_sizes = useSelector((state) => state.ProductReducer.allSizes);
  const load = useSelector((state) => state.ProductReducer.load);
  const dispatch = useDispatch();

  useEffect(() => {
    if (title) {
      dispatch(getAllSizes());
      setSizes(titles_sizes);
    }
  }, [dispatch, title]);

  return (
    <div>
      {load ? (
        <ProgressLoad /> // Affichage du loader pendant le chargement
      ) : (
        <ul className="flex ">
          {sizes
            .filter((element) => element.title === title)
            .map((item, index) => (
              <li
                key={index}
                className="mx-1 p-1 text-white bg-black  text-center  cursor-pointer hover:bg-gray-700 transition duration-300"
              >
                {item.size}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
export default SizesList;
