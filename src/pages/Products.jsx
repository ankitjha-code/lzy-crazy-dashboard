import React, { useEffect, useState } from "react";
import instance from "../lib/axios/axiosInstance";
import toast from "react-hot-toast";
import { Edit, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const Products = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupLoading, setLopupLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  const isFormComplete = image && price && title;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("price", price);
      console.log("Sending Data:", {
        title,
        price,
        image: image ? image.name : null,
      });
      console.log("Form Data:", formData);

      const { data } = await instance.post("/products/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success || data.message) {
        toast.success(data.message || "Product added successfully");
        setImage(null);
        setTitle("");
        setPrice("");
        getProductList();
      }
    } catch (error) {
      console.log("Error uploading product:", error);
      toast.error(error.response?.data?.message || "Upload failed");
    }
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await instance.delete(`/products/delete-product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success || data.message) {
        toast.success(data.message || "Product deleted successfully");
        getProductList(); // Refresh the list after deletion
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const getProductList = async () => {
    try {
      // Use POST just like the blogs component
      const { data } = await instance.post("/products/get-product", {
        userId: user._id,
      });

      if (data) {
        setProductList(Array.isArray(data) ? data : data.products || []);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
    }
  };

  const handleEditSave = async () => {
    setLopupLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("price", editPrice);
      if (editImage) formData.append("image", editImage);

      const { data } = await instance.put(
        `/products/edit-product/${editProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success || data.message) {
        toast.success(data.message || "Product updated successfully");
        setLopupLoading(false);
        setEditProduct(null);
        getProductList();
      }
    } catch (error) {
      setLopupLoading(false);
      toast.error(error.response?.data?.message || "Update failed");
      console.error(error);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 mt-16 bg-white shadow-lg rounded-lg">
      {/* Upload Product */}
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
        {image && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-32 h-32 object-cover border rounded"
            />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-base font-semibold mb-2">
          Product Name
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter product name"
          className="w-full border border-gray-300 rounded px-4 py-3 text-base mb-3"
        />
        <label className="block text-base font-semibold mb-2">
          Product Price
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price"
          className="w-full border border-gray-300 rounded px-4 py-3 text-base mb-3"
        />

        <button
          onClick={handlePublish}
          disabled={!isFormComplete || loading}
          className={`text-base font-semibold px-5 py-3 rounded mt-4 ${
            isFormComplete
              ? "bg-blue-500 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {loading ? "Loading..." : "Publish"}
        </button>
      </div>

      {/* Product List */}
      {productList?.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Published Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left border-b">Image</th>
                  <th className="py-3 px-4 text-left border-b">Product Name</th>
                  <th className="py-3 px-4 text-left border-b">
                    Product Price
                  </th>
                  <th className="py-3 px-4 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">
                      {product.image ? (
                        <img
                          src={
                            product.image.startsWith("http")
                              ? product.image
                              : `http://localhost:4000/${product.image}`
                          }
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3 px-4">{product.title}</td>
                    <td className="py-3 px-4">{product.price}</td>
                    <td className="py-3 px-4 flex gap-3 items-center">
                      <Trash2
                        className="text-red-500 cursor-pointer"
                        onClick={() => deleteProduct(product._id)}
                      />
                      <Edit
                        className="text-green-500 cursor-pointer"
                        onClick={() => {
                          setEditProduct(product);
                          setEditTitle(product.title);
                          setEditPrice(product.price);
                          setEditImage(null);
                        }}
                      />
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

      {/* Edit Popup */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Product Title"
              className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
            />

            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              placeholder="Product Price"
              className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditImage(e.target.files[0])}
              className="mb-3"
            />

            {editProduct.image && !editImage && (
              <img
                src={
                  editProduct.image.startsWith("http")
                    ? editProduct.image
                    : `http://localhost:4000/${editProduct.image}`
                }
                alt="Current"
                className="w-20 h-20 object-cover mb-3"
              />
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditProduct(null)}
                className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                disabled={popupLoading}
              >
                Cancel
              </button>

              <button
                onClick={handleEditSave}
                disabled={popupLoading}
                className={`px-4 py-2 rounded text-white cursor-pointer ${
                  popupLoading ? "bg-blue-300" : "bg-blue-500"
                }`}
              >
                {popupLoading ? "Loading..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
