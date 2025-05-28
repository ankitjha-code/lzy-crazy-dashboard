import React, { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";

const Blogs = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [tempBlogs, setTempBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (!blogTitle.trim() || !selectedImage) return;

    const newBlog = {
      title: blogTitle.trim(),
      image: selectedImage,
    };

    setTempBlogs([...tempBlogs, newBlog]);
    setBlogTitle("");
    setSelectedImage(null);
  };

  const handlePublish = () => {
    if (tempBlogs.length === 0) return;

    setBlogs([...blogs, ...tempBlogs]);
    setTempBlogs([]);
  };

  const handleDelete = (index) => {
    const updated = blogs.filter((_, i) => i !== index);
    setBlogs(updated);
  };

  const handleEdit = (index) => {
    const blog = blogs[index];
    setBlogTitle(blog.title);
    setSelectedImage(blog.image);
    setEditingIndex(index);
  };

  const handleUpdate = () => {
    if (!blogTitle.trim() || !selectedImage || editingIndex === null) return;

    const updatedBlogs = [...blogs];
    updatedBlogs[editingIndex] = {
      title: blogTitle.trim(),
      image: selectedImage,
    };

    setBlogs(updatedBlogs);
    setBlogTitle("");
    setSelectedImage(null);
    setEditingIndex(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 mt-16 bg-white shadow-lg rounded-lg">
      {/* Image Upload */}
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-60 border border-gray-300 rounded px-4 py-3 text-base"
        />
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Preview"
            className="mt-4 w-60 h-auto rounded border border-gray-300"
          />
        )}
      </div>

      {/* Blog Title Input */}
      <label className="block text-base font-semibold mb-2">Blog Title</label>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          placeholder="Enter blog title"
          className="flex-1 border border-gray-300 rounded px-4 py-3 text-base"
        />
        {editingIndex === null ? (
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 rounded text-base hover:bg-blue-50 transition"
          >
            <Plus className="w-5 h-5" /> Add
          </button>
        ) : (
          <button
            onClick={handleUpdate}
            className="flex items-center justify-center gap-2 px-5 py-3 border border-yellow-300 bg-yellow-100 text-base rounded hover:bg-yellow-200 transition"
          >
            <Pencil className="w-5 h-5" /> Update
          </button>
        )}
      </div>

      {/* Publish Button */}
      <button
        onClick={handlePublish}
        disabled={tempBlogs.length === 0}
        className={`text-base font-semibold px-8 py-3 rounded transition ${
          tempBlogs.length === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Publish
      </button>

      {/* Unpublished Blogs List */}
      {tempBlogs.length > 0 && (
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-600 mb-2">
            Unpublished Blogs:
          </h3>
          <ul className="list-disc list-inside text-gray-500">
            {tempBlogs.map((item, idx) => (
              <li key={idx}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Published Blogs Table */}
      {blogs.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Published Blogs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left border-b">Image</th>
                  <th className="py-3 px-4 text-left border-b">Blog Title</th>
                  <th className="py-3 px-4 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">
                      <img
                        src={blog.image}
                        alt="blog"
                        className="w-16 h-16 object-cover rounded border"
                      />
                    </td>
                    <td className="py-3 px-4 text-base">{blog.title}</td>
                    <td className="py-3 px-4 flex gap-4">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <Pencil size={16} />
                      </button>
                      <span>|</span>
                      <button
                        onClick={() => handleDelete(index)}
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
        </div>
      ) : (
        <p className="mt-10 text-gray-500 text-center">
          No blogs published yet.
        </p>
      )}
    </div>
  );
};

export default Blogs;
