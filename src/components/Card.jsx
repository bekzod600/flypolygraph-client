/* eslint-disable react/prop-types */
import { useInfoContext } from "../context";

const Card = ({ product }) => {
  const { selectedProducts, setSelectedProducts } = useInfoContext();

  const incQty = () => {
    const isHave = selectedProducts.find((pr) => pr._id == product._id);
    if (!isHave) {
      setSelectedProducts((prev) => [...prev, { ...product, qty: 1 }]);
    } else {
      const dd = selectedProducts.map((val) => {
        if (val._id === product._id) val.qty++;
        return val;
      });
      setSelectedProducts(dd);
    }
  };
  const decQty = () => {
    const isHave = selectedProducts.find((pr) => pr._id == product._id);
    if (isHave) {
      if (isHave.qty > 1) {
        const dd = selectedProducts.map((val) => {
          if (val._id === product._id) val.qty--;
          return val;
        });
        setSelectedProducts(dd);
      } else {
        const dd = selectedProducts.filter((val) => val._id !== product._id);
        setSelectedProducts(dd);
      }
    }
  };

  return (
    <div className="relative">
      <div>
        <div className="bg-white rounded overflow-hidden">
          <img
            className="w-full  aspect-mobile object-cover object-center"
            src={product.images[0].secure_url}
            alt={product.title}
          />
        </div>
        <h2 className="my-2 text-xs">
          {product.title} • <span className=" font-bold ">{product.price}so`m</span>
        </h2>
        <div className={"flex justify-between gap-1"}>
          {selectedProducts.find((pr) => pr._id === product._id) ? (
            <button onClick={decQty} className="grow btn btn-danger">
              <i className="fas fa-minus"></i>
            </button>
          ) : (
            ""
          )}
          <button onClick={incQty} className="grow btn btn-primary">
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div
        className={
          selectedProducts.find((pr) => pr._id === product._id)
            ? "absolute top-0 right-0 translate-x-1/3 -translate-y-1/3   duration-100 scale-100 opacity-100"
            : "absolute top-0 right-0 translate-x-1/2  duration-100 scale-0  opacity-0"
        }
      >
        <p className="w-5 h-5 font-bold text-xs shadow flex justify-center items-center bg-c-primary p-1 rounded-full">
          {selectedProducts.find((pr) => pr._id === product._id)
            ? selectedProducts.find((pr) => pr._id === product._id).qty
            : 0}
        </p>
      </div>
    </div>
  );
};

export default Card;
