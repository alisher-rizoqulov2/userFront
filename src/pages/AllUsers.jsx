import React, { useState, useEffect } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    jshshr: "",
    dob: "",
    address: "",
  });
  const [editUser, setEditUser] = useState(null);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://63.178.152.4:3000/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Foydalanuvchilarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (searchId.trim()) {
        const res = await axios.get(
          `http://63.178.152.4:3000/users/${searchId}`
        );
        setUsers([res.data]);
      } else if (searchTerm.trim()) {
        const res = await axios.post("http://63.178.152.4:3000/users/search", {
          search: searchTerm,
        });
        setUsers(res.data);
      } else {
        await fetchAllUsers();
      }
    } catch (error) {
      console.error("Qidiruvda xatolik:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Rostdan ham o‘chirmoqchimisiz?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://63.178.152.4:3000/users/${id}`);
      alert("Foydalanuvchi o‘chirildi");
      fetchAllUsers();
    } catch (error) {
      console.error("O‘chirishda xatolik:", error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user.id);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      jshshr: user.jshshr,
      dob: user.dob,
      address: user.address,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://63.178.152.4:3000/users/${editUser}`, formData);
      alert("Foydalanuvchi yangilandi.");
      setEditUser(null);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        jshshr: "",
        dob: "",
        address: "",
      });
      fetchAllUsers();
    } catch (error) {
      console.error("Yangilashda xatolik:", error);
      alert("Yangilashda xatolik yuz berdi.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Foydalanuvchilar Qidiruvi</h2>

      {/* 🔎 Qidiruvlar */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Ism, email, JSHSHIR bo‘yicha qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-full"
        />
        <input
          type="number"
          placeholder="ID bo‘yicha qidirish..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="px-4 py-2 border rounded-md w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full md:w-auto"
        >
          Qidirish
        </button>
      </div>

      {/* 🛠 Edit form */}
      {editUser && (
        <form
          onSubmit={handleUpdate}
          className="bg-gray-100 p-4 mb-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2">Tahrirlash</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              placeholder="Ism"
              className="px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              placeholder="Familiya"
              className="px-3 py-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="jshshr"
              value={formData.jshshr}
              onChange={(e) =>
                setFormData({ ...formData, jshshr: e.target.value })
              }
              placeholder="JSHSHIR"
              className="px-3 py-2 border rounded"
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              className="px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Manzil"
              className="px-3 py-2 border rounded col-span-2"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Yangilash
            </button>
            <button
              type="button"
              onClick={() => setEditUser(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      )}

      {/* 📋 Jadval */}
      {loading ? (
        <div>Yuklanmoqda...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Ism</th>
                <th className="py-2 px-4">Familiya</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">JSHSHIR</th>
                <th className="py-2 px-4">Tug‘ilgan sana</th>
                <th className="py-2 px-4">Manzil</th>
                <th className="py-2 px-4">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{user.id}</td>
                    <td className="py-2 px-4">{user.first_name}</td>
                    <td className="py-2 px-4">{user.last_name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.jshshr}</td>
                    <td className="py-2 px-4">{user.dob}</td>
                    <td className="py-2 px-4">{user.address}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Foydalanuvchilar topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
