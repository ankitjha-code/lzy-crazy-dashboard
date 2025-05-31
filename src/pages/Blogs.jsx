import React, { useEffect, useState } from "react";
import axios from "../lib/axios/axiosInstance"; // Axios instance with baseURL
import { Plus, Trash2, Pencil } from "lucide-react";

const Blogs = () => {
  // State variables
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [blogList, setBlogList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token"); // JWT token from localStorage

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch all blogs from backend
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/blogs/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogList(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG files are allowed");
      return;
    }

    setSelectedImage(file);

    // Create a preview image URL
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  // Reset form inputs & editing state
  const resetForm = () => {
    setTitle("");
    setSelectedImage(null);
    setPreviewImage(null);
    setEditingId(null);
  };

  // Add new blog
  const handleAdd = async () => {
    if (!title.trim()) return alert("Please enter title");

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      if (selectedImage) formData.append("image", selectedImage);

      const res = await axios.post("/blogs/Addblogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Blog added successfully");
      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error("Add error:", error);
      alert(error.response?.data?.message || "Failed to add blog");
    }
  };

  // Edit blog: fill form with selected blog data
  const handleEdit = (item) => {
    setTitle(item.title || "");
    setPreviewImage(
      item.image?.startsWith("http")
        ? item.image
        : `http://localhost:4000/${item.image}`
    );
    setSelectedImage(null);
    setEditingId(item._id);
  };

  // Update existing blog
  const handleUpdate = async () => {
    if (!title.trim()) return alert("Please enter title");

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      if (selectedImage) formData.append("image", selectedImage);

      const res = await axios.put(`/blogs/editblogs/${editingId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Blog updated successfully");
      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error("Update error:", error);
      alert(error.response?.data?.message || "Failed to update blog");
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this blog?")) return;

    try {
      const res = await axios.delete(`/blogs/delblogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(res.data.message || "Deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-16">
      <h2 className="text-2xl font-semibold mb-6">
        {editingId ? "Edit Blog" : "Create Blog"}
      </h2>

      {/* Image Upload Input */}
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

        {editingId && (
          <button
            onClick={resetForm}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Blog List Table */}
      {blogList.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Published Blogs</h3>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Image</th>
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogList.map((item) => (
                <tr key={item._id}>
                  <td className="p-3 border-b">
                    {item.image ? (
                      <img
                        src={
                          item.image.startsWith("http")
                            ? item.image
                            : `http://localhost:4000/${item.image}`
                        }
                        alt="Blog"
                        className="w-16 h-16 object-cover rounded border"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="p-3 border-b">{item.title}</td>
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

export default Blogs;
