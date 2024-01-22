import { useEffect, useState } from "react";
import axios from "axios";
import { useInfoContext } from "../context";
import { useNavigate } from "react-router-dom";
import CategoryCards from "../components/CategoryCards";
import Search from "../components/Search";
import Filter from "../components/Filter";
import Cards from "../components/Cards";

const tele = window.Telegram.WebApp;

const HomeView = () => {
  const { categories, setCategories, products, setProducts, selectedProducts } = useInfoContext();
  const [searchVal, setSearchVal] = useState("");
  const [handleCategoryData, setHandleCategoryData] = useState("");
  const navigate = useNavigate();

  tele.MainButton.text = "Tanlangan mahsulotlar";
  tele.MainButton.onClick(() => navigate("/checkout"));
  useEffect(() => {
    if (selectedProducts.length) tele.MainButton.show();
    else tele.MainButton.hide();
  }, [selectedProducts]);

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function filteredProducts(products) {
    const searchedValue = products.filter((pr) => {
      const regex = new RegExp(searchVal, "gi");
      return pr.title.match(regex) || pr.category_id.title.match(regex);
    });
    const selectedCategory = searchedValue.filter((pr) => {
      const regex = new RegExp(handleCategoryData, "gi");
      return pr.category_id.title.match(regex);
    });

    return selectedCategory;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchApi = async () => {
    try {
      setLoading(true);
      const axiosrequest1 = axios.get("/products");
      const axiosrequest2 = axios.get("/categories");
      await axios.all([axiosrequest1, axiosrequest2]).then(
        axios.spread(function (res1, res2) {
          setProducts(res1.data);
          setCategories(res2.data);
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((p) => !p);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="w-[90%] max-w-[1880px] mx-auto">
      <div className="pt-6 grid grid-cols-[6fr_1fr] gap-4">
        <Search setSearchVal={setSearchVal}></Search>
        <Filter></Filter>
      </div>
      <div>
        <CategoryCards
          loading={loading}
          setHandleCategoryData={setHandleCategoryData}
          handleCategoryData={handleCategoryData}
          categories={categories}
        />
        <Cards loading={loading} products={filteredProducts(products)} />
      </div>
    </div>
  );
};

export default HomeView;
