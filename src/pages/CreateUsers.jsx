import React, { useState } from "react";
import axios from "axios";

const CreateUsers = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    jshshr: "",
    dob: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "jshshr") {
      if (value.length > 16) return;
      if (!/^\d*$/.test(value)) return; 
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.jshshr.length !== 16) {
      alert("JSHSHIR 16 ta raqamdan iborat bo'lishi kerak!");
      return;
    }

    try {
      const res = await axios.post("http://63.178.152.4:3000/users", formData);
      alert("Foydalanuvchi muvaffaqiyatli yaratildi!");
      console.log("Yaratilgan foydalanuvchi:", res.data);
    } catch (error) {
      console.error("Yuborishda xatolik:", error.response.data.message);
      alert(
        `Xatolik yuz berdi. Qayta urinib ko‘ring.${error.response.data.message}`
      );
    }

    e.target.reset();
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      jshshr: "",
      dob: "",
      address: "",
    });
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center mt-[30px]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Foydalanuvchi yaratish
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Ism</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Ismingizni kiriting"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Familiya
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Familiyangizni kiriting"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="email@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            JSHSHIR
          </label>
          <input
            type="number"
            name="jshshr"
            value={formData.jshshr}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="16 xonali raqam"
            inputMode="numeric"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Tug‘ilgan sana
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Manzil</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Yashash manzilingiz"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Yaratish
        </button>
      </form>
    </div>
  );
};

export default CreateUsers;
