import { Link } from "react-router-dom";
import { useInfoContext } from "../context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BrandLogo from "../assets/cake_logo.png";

const tele = window.Telegram.WebApp;

const CheckoutView = () => {
  const { selectedProducts, totalSumSelectedProducts, userData } = useInfoContext();
  const navigate = useNavigate();

  function handleCancel() {
    navigate("/");
  }
  function handleSave() {
    if (userData.name && userData.phone) {
      if (!selectedProducts.length) {
        navigate("/");
      } else if (userData.name.length < 3 || userData.name.length > 128) {
        navigate("/contact?focus=name&error=name");
      } else if (userData.phone.length !== 13) {
        navigate("/contact?focus=phone&error=phone");
      } else {
        const data = {
          username: userData.name,
          phone: userData.phone,
          totalPrice: totalSumSelectedProducts,
          products: selectedProducts.map((p) => {
            return { product_id: p._id, quantity: p.qty };
          }),
        };
        tele.sendData(JSON.stringify({ ...data, products: selectedProducts }));
        addOrder(data);
      }
    } else {
      navigate("/contact?focus=name");
    }
  }

  async function addOrder(data) {
    try {
      await axios.post("/orders", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <section className="hero py-4">
        <div
          className="flex items-center gap-2 max-w-[90%] mx-auto
        "
        >
          <img className="w-14 object-contain object-center" src={BrandLogo} alt="image" />
          <div className="text-xs space-y-0.5">
            <p className="font-medium">Order #151379378</p>
            <p>Ajoyib mahsulotlar Asil-Laziz to&apos;rtlari tomonidan😊</p>
            <p className="text-gray-500">Asil-Laziz to&apos;rtlari</p>
          </div>
        </div>
      </section>
      <p className=" bg-[#232E3C] py-1"></p>
      <section className="">
        <ul className="max-w-[90%] mx-auto py-3 text-xs">
          {selectedProducts.map((val) => (
            <li className=" py-0.5" key={val._id}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 ">
                  <img
                    className="w-5 h-5 object-contain object-center"
                    src={val.images[0].secure_url}
                    alt={val.title}
                  />
                  <h1>
                    {val.title} x{val.qty}
                  </h1>
                </div>
                <p className="min-w-max">{val.price} UZS</p>
              </div>
            </li>
          ))}
          <li className="py-0.5">
            <div className=" flex justify-between">
              <h3>Yetkazib Berish</h3>
              <p>0 UZS</p>
            </div>
          </li>
          <li className="py-0.5">
            <div className=" flex justify-between font-semibold">
              <h3>Umumiy</h3>
              <p>{totalSumSelectedProducts} UZS</p>
            </div>
          </li>
        </ul>
      </section>
      <p className=" bg-[#232E3C] py-1"></p>
      <section className="">
        <div>
          <ul className="py-3 text-sm">
            <li className=" hover:bg-[#232E3C] cursor-pointer">
              <Link className="max-w-[90%] mx-auto flex justify-between items-center py-2" to="/contact?focus=name">
                <div className=" space-x-2">
                  <i className="fas fa-user"></i>
                  <span>Ism Familya</span>
                </div>
                <p className="text-blue-500">{userData.name}</p>
              </Link>
            </li>
            <li className=" hover:bg-[#232E3C] cursor-pointer">
              <Link className="max-w-[90%] mx-auto flex justify-between items-center py-2" to="/contact?focus=phone">
                <div className=" space-x-2">
                  <i className="fas fa-phone"></i>
                  <span>Telefon Nomer</span>
                </div>
                <p className="text-blue-500">{userData.phone}</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="absolute right-[5%] bottom-0">
          <div className="py-3 space-x-3">
            <button
              onClick={handleCancel}
              className="rounded-md font-medium hover:bg-slate-700 py-2 px-4 duration-100 text-c-text"
            >
              Qaytish
            </button>
            <button
              onClick={handleSave}
              className=" rounded-md font-medium bg-c-text hover:bg-c-text-hover  py-2 px-4 duration-100 text-white"
            >
              Saqlash
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutView;
