import React, { useEffect, useState } from "react";
import axios from "../lib/axios/axiosInstance";
import { Plus, Trash2, Pencil } from "lucide-react";

const AboutUsForm = () => {
  const [title, setTitle] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [aboutList, setAboutList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAboutList();
  }, []);

  const fetchAboutList = async () => {
    try {
      const res = await axios.get("/about/getabout");
      setAboutList(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG files are allowed");
      return;
    }

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle("");
    setAboutText("");
    setSelectedImage(null);
    setPreviewImage(null);
    setEditingId(null);
  };

  const handleAdd = async () => {
    if (!title.trim()) return alert("Please enter title");
    if (!aboutText.trim()) return alert("Please enter about text");

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", aboutText.trim());
      if (selectedImage) formData.append("image", selectedImage);

      const res = await axios.post("/about/Addabout", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Added successfully");
      fetchAboutList();
      resetForm();
    } catch (error) {
      console.error("Add error:", error);
      alert(error.response?.data?.message || "Failed to add About Us entry");
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title || "");
    setAboutText(item.description || "");
    setPreviewImage(
      item.image?.startsWith("http")
        ? item.image
        : `http://localhost:4000/${item.image}`
    );
    setSelectedImage(null);
    setEditingId(item._id);
  };

  const handleUpdate = async () => {
    if (!title.trim() || !aboutText.trim())
      return alert("Please fill all fields");

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", aboutText.trim());
      if (selectedImage) formData.append("image", selectedImage);

      const res = await axios.put(`/about/editabout/${editingId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Updated successfully");
      fetchAboutList();
      resetForm();
    } catch (error) {
      console.error("Update error:", error);
      alert(error.response?.data?.message || "Failed to update About Us entry");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this entry?")) return;

    try {
      const res = await axios.delete(`/about/delabout/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(res.data.message || "Deleted successfully");
      fetchAboutList();
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete entry");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-16">
      <h2 className="text-2xl font-semibold mb-6">About Us Form</h2>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleImageChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="mt-4 w-48 h-auto rounded border border-gray-300 object-cover"
          />
        )}
      </div>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      {/* About Text Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">About Text</label>
        <input
          type="text"
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          placeholder="Enter about text"
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={editingId ? handleUpdate : handleAdd}
          className={`flex items-center gap-2 px-4 py-2 rounded text-white ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <Plus size={16} />
          {editingId ? "Update" : "Add"}
        </button>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus size={16} />
          Publish
        </button>
      </div>

      {/* About List */}
      {aboutList.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Published About Us</h3>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Image</th>
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Text</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {aboutList.map((item) => (
                <tr key={item._id}>
                  <td className="p-3 border-b">
                    {item.image ? (
                      <img
                        src={
                          item.image.startsWith("http")
                            ? item.image
                            : `http://localhost:4000/${item.image}`
                        }
                        alt="About"
                        className="w-16 h-16 object-cover rounded border"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="p-3 border-b">{item.title}</td>
                  <td className="p-3 border-b">{item.description}</td>
                  <td className="p-3 border-b flex gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AboutUsForm;
