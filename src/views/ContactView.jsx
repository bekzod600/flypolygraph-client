import "./ContactView.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useInfoContext } from "../context";

const ContactView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userData, setUserData } = useInfoContext();

  const [checked, setChecked] = useState(false);

  const onfocus = searchParams.get("focus");
  const onError = searchParams.get("error");
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const handleChange = () => setChecked(!checked);

  function handleData(event) {
    if (event.target.name === "name")
      setUserData((prev) => {
        return { ...prev, name: event.target.value };
      });
    else if (event.target.name === "phone")
      setUserData((prev) => {
        return { ...prev, phone: event.target.value };
      });
  }

  useEffect(() => {
    if (onfocus === "name") nameRef.current.focus();
    else if (onfocus === "phone") phoneRef.current.focus();
  }, []);

  function handleCancel() {
    navigate("/checkout");
  }
  function handleSave() {
    if (checked) localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/checkout");
  }

  return (
    <main className="max-w-[90%] mx-auto py-10 space-y-6">
      <div className="form__group field">
        <input
          type="text"
          onChange={handleData}
          value={userData.name}
          className="form__field"
          placeholder="Name"
          name="name"
          ref={nameRef}
          id="name"
          required
        />
        <label htmlFor="name" className="form__label">
          Ism Familya
        </label>
      </div>
      <div className="form__group field">
        <input
          ref={phoneRef}
          onChange={handleData}
          value={userData.phone}
          type="text"
          className="form__field"
          placeholder="phone"
          name="phone"
          id="phone"
          required
        />
        <label htmlFor="phone" className="form__label">
          Telefon Nomer
        </label>
      </div>
      <div className="space-x-2">
        <input
          checked={checked}
          onChange={handleChange}
          className="bg-transparent text-2xl"
          type="checkbox"
          name="save"
          id="save"
        />
        <label htmlFor="save">Kelajakda foydalanish uchun ma&apos;lumotlarni saqlang</label>
      </div>
      <div className="absolute right-[5%] bottom-0">
        <div className="py-3 space-x-3">
          <button
            onClick={handleCancel}
            className="uppercase rounded-md font-medium hover:bg-slate-700 py-2 px-4 duration-100 text-c-text"
          >
            Qaytish
          </button>
          <button
            onClick={handleSave}
            className="uppercase rounded-md font-medium hover:bg-slate-700 py-2 px-4 duration-100 text-c-text"
          >
            Saqlash
          </button>
        </div>
      </div>
    </main>
  );
};

export default ContactView;
