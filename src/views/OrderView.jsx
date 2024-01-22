import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useInfoContext } from "../context";

const tele = window.Telegram.WebApp;

const OrderView = () => {
  const { selectedProducts } = useInfoContext();
  const navigate = useNavigate();

  tele.MainButton.text = "Buyurtma berish";
  tele.MainButton.onClick(() => navigate("/checkout"));
  tele.MainButton.show();

  useEffect(() => {
    return () => {
      tele.MainButton.hide();
    };
  }, []);

  return (
    <main className=" min-h-screen bg-[#232E3C]">
      <header className=" bg-[#17212B] py-6">
        <div className="max-w-[90%] mx-auto flex justify-between items-end">
          <h2 className="font-bold">TANLANGAN MAHSULOTLAR</h2>
          <Link className="text-green-600 font-bold text-sm p-1 pr-0" to="/">
            O&apos;ZGARTIRISH
          </Link>
        </div>
      </header>
      <p className=" bg-[#232E3C] py-1"></p>
      <section className="bg-[#17212B]">
        <ul className="orders max-w-[90%] mx-auto space-y-0">
          {selectedProducts.map((product) => (
            <li className="order py-4 flex gap-2" key={product._id}>
              <img
                className="w-12 h-12 object-contain object-center"
                src={product.images[0].secure_url}
                alt={product.title}
              />
              <div className="flex grow justify-between items-center text-xs">
                <h3 className="font-bold ">
                  {product.title} <span className="text-[#F8A917] ">{product.qty}x</span>
                </h3>
                <p className="min-w-max font-bold">
                  {product.price} {"so'm"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <Link to="/checkout">checkout</Link>
    </main>
  );
};

export default OrderView;
