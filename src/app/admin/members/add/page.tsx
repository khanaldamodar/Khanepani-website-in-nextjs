"use client";

import { useState } from "react";
import Cookies from "js-cookie";

export default function AddMember() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    position: "",
    type: "",
    photo: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm((prev) => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("number", form.number);
    formData.append("position", form.position);
    formData.append("type", form.type);
    if (form.photo) formData.append("photo", form.photo);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = Cookies.get("token");
      const res = await fetch(`${apiUrl}members`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Replace this with your actual token variable
        },
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", number: "", position: "", type: "board", photo: null });
        (document.getElementById("photo") as HTMLInputElement).value = "";
      } else {
        const error = await res.json();
        alert(error.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Failed to add member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Phone Number"
          value={form.number}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="board">Board</option>
          <option value="staff">Staff</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Member"}
        </button>

        {success && <p className="text-green-600 text-center mt-2">Member added successfully!</p>}
      </form>
    </div>
  );
}
