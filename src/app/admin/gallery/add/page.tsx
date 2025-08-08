"use client";

import { useState } from "react";
import Cookies from "js-cookie"; // Ensure you have js-cookie installed

export default function AddGallery() {
  const [images, setImages] = useState<FileList | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    if (images) {
      Array.from(images).forEach((image) => {
        formData.append("images[]", image); // match Laravel's images.*
      });
    }

    try {
      const token = Cookies.get("token"); // Assuming you have a way to get the token from cookies or context
      const res = await fetch("http://localhost:8000/api/gallery", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Replace with actual token
        },
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        setTitle("");
        setCategory("");
        setImages(null);
        (document.getElementById("images") as HTMLInputElement).value = "";
      } else {
        const err = await res.json();
        alert(err.message || "Failed to upload");
      }
    } catch (err) {
      alert("Upload error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow font-poppins">
      <h2 className="text-2xl font-semibold mb-6">Add Gallery Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Gallery Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="awards">Awards</option>
          <option value="activity">Activity</option>
          <option value="banner">Banner</option>
          <option value="others">Others</option>
        </select>

        <input
          type="file"
          name="images"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {success && (
          <p className="text-green-600 font-medium">
            Gallery uploaded successfully!
          </p>
        )}
      </form>
    </div>
  );
}
