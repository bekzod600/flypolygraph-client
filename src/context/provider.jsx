import { InfoContent } from "./model";
import { useState, useMemo } from "react";
import { useEffect } from "react";

const getTotalSum = (products) => {
  return products.reduce((acc, cur) => acc + Number(cur.price) * cur.qty, 0);
};

// eslint-disable-next-line react/prop-types
export const InfoContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState({ name: "", phone: "+998" });
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const lsUserData = JSON.parse(localStorage.getItem("userData"));
    if (lsUserData) {
      setUserData((p) => {
        return { ...p, ...lsUserData };
      });
    }
  }, []);

  let totalSumSelectedProducts = useMemo(() => {
    return selectedProducts?.length ? getTotalSum(selectedProducts) : 0;
  }, [selectedProducts]);

  return (
    <InfoContent.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        userData,
        setUserData,
        selectedProducts,
        setSelectedProducts,
        totalSumSelectedProducts,
      }}
    >
      {children}
    </InfoContent.Provider>
  );
};
