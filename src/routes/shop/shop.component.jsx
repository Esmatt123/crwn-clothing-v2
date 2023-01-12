import { fetchCategoriesStart } from "../../store/categories/category.action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Category from "../category/category.component";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart()); //*Sets the isLoading payload to true which activates the fetchCategoriesAsync function
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
