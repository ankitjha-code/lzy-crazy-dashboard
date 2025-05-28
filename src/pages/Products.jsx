import React, { useState } from "react";
import { Plus, Trash2, Pencil, ImagePlus } from "lucide-react";

const Products = () => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [tempList, setTempList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
  };

  const handleAdd = () => {
    if (!productName.trim()) return;

    const newItem = {
      name: productName.trim(),
      image: productImage,
    };
    setTempList([...tempList, newItem]);
    setProductName("");
    setProductImage(null);
  };

  const handlePublish = () => {
    if (tempList.length === 0) return;
    const updatedList = [...productList, ...tempList];
    setProductList(updatedList);
    setTempList([]);
  };

  const handleEdit = (index) => {
    const item = productList[index];
    setProductName(item.name);
    setProductImage(item.image);
    setEditingIndex(index);
  };

  const handleUpdate = () => {
    if (!productName.trim() || editingIndex === null) return;
    const updatedList = [...productList];
    updatedList[editingIndex] = {
      ...updatedList[editingIndex],
      name: productName.trim(),
      image: productImage,
    };
    setProductList(updatedList);
    setProductName("");
    setProductImage(null);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updatedList = [...productList];
    updatedList.splice(index, 1);
    setProductList(updatedList);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-16 bg-white shadow-lg rounded-lg">
      {/* Image Upload with Preview */}
      <div className="mb-6">
        <label className="block text-base font-semibold mb-2">
          Upload Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-60 border border-gray-300 rounded px-4 py-2 text-sm"
        />
        {productImage && (
          <div className="mt-4">
            <img
              src={productImage}
              alt="Preview"
              className="w-32 h-32 object-cover border rounded"
            />
          </div>
        )}
      </div>

      {/* Product Name Input */}
      <label className="block text-base font-semibold mb-2">Product Name</label>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
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
            className="flex items-center justify-center gap-2 px-5 py-3 border border-yellow-400 bg-yellow-100 rounded text-base hover:bg-yellow-200 transition"
          >
            <Pencil className="w-5 h-5" /> Update
          </button>
        )}
      </div>

      {/* Publish Button */}
      <button
        onClick={handlePublish}
        disabled={tempList.length === 0}
        className={`text-base font-semibold px-8 py-3 rounded transition ${
          tempList.length === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Publish
      </button>

      {/* Unpublished Products */}
      {tempList.length > 0 && (
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-600 mb-2">
            Unpublished Products:
          </h3>
          <ul className="list-disc list-inside text-gray-500">
            {tempList.map((item, idx) => (
              <li key={idx}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Published Products Table */}
      {productList.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Published Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left border-b">Image</th>
                  <th className="py-3 px-4 text-left border-b">Product Name</th>
                  <th className="py-3 px-4 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3 px-4 text-base">{product.name}</td>
                    <td className="py-3 px-4 flex gap-4">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:underline flex items-center gap-1"
                      >
                        <span>|</span>
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
          No products published yet.
        </p>
      )}
    </div>
  );
};

export default Products;
