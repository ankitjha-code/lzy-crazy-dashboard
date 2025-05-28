import React, { useState } from "react";
import { Plus } from "lucide-react";

const Blogs = () => {
  const [productName, setProductName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleAdd = () => {
    console.log("Product Name Added:", productName);
    setProductName("");
  };

  const handlePublish = () => {
    console.log("Published");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-16 bg-white shadow-lg rounded-lg">
      {/* File Upload */}
      <div className="mb-6">
        <input
          type="file"
          onChange={handleImageChange}
          className="block w-60 border border-gray-300 rounded px-4 py-2 text-sm"
        />
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Preview"
            className="mt-4 w-60 h-auto rounded border border-gray-300"
          />
        )}
      </div>

      {/* Product Name Input */}
      <label className="block text-base font-semibold mb-2">Product</label>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          className="flex-1 border border-gray-300 rounded px-4 py-3 text-base"
        />
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 rounded text-base hover:bg-blue-50 transition"
        >
          <Plus className="w-5 h-5" /> Add
        </button>
      </div>

      {/* Publish Button */}
      <button
        onClick={handlePublish}
        className="bg-blue-600 text-white text-base font-semibold px-8 py-3 rounded hover:bg-blue-700 transition"
      >
        Publish
      </button>
    </div>
  );
};

export default Blogs;
