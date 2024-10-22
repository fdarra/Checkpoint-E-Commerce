import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDistinctCategory } from "../JS/Actions/ProductActions";

const CategoryList = (gender) => {
  const dispatch = useDispatch();
  const Categorys = useSelector((state) => state.ProductReducer.categorys);

  useEffect(() => {
    dispatch(getDistinctCategory());
    console.log(Categorys);
  }, [dispatch]);

  return (
    <div className="flex justify-start flex-wrap  gap-3 pl-2">
      {Categorys.map((category) => (
        <button>{category}</button>
      ))}
    </div>
  );
};

export default CategoryList;
