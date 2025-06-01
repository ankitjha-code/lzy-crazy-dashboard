import React, { useEffect, useState } from "react";
import { Edit, Trash2, Upload, X } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "../lib/axios/axiosInstance";
import toast from "react-hot-toast";
const Offers = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [offers, setOffers] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popupLoding, setPopupLoading] = useState(false);

  // Fetch offers for current user
  useEffect(() => {
    if (user && isAuthenticated) {
      fetchOffers();
    }
  }, [user]);

  const fetchOffers = async () => {
    try {
      const res = await axios.post("/specialOffers/get-specialOffer", {
        userId: user._id,
      });
      if (res.data.success) {
        setOffers(res.data.specialOffers);
      }
    } catch (err) {
      console.error(
        "Error fetching offers:",
        err.response?.data || err.message
      );
    }
  };

  // Custom image input handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLogoFile(null);
    setLogoPreview(null);
  };

  // Handle form submit
  const handleCreateOffer = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!title.trim() || !logoFile) {
      alert("Image and title are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", logoFile);

    try {
      const res = await axios.post("/specialOffers/specialOffer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setLoading(false);
        fetchOffers();
        setTitle("");
        setDescription("");
        setLogoFile(null);
        setLogoPreview(null);
      }
    } catch (err) {
      console.error("Error creating offer:", err.response?.data || err.message);
      setLoading(false);
    }
  };

  const openEditModal = (offer) => {
    setEditingOffer(offer);
    setTitle(offer.title);
    setDescription(offer.description);
    setLogoPreview(offer.imageUrl);
    setEditModalOpen(true);
  };

  // Handle offer edit
  const handleUpdateOffer = async () => {
    setPopupLoading(true);
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (logoFile) {
      formData.append("image", logoFile);
    }

    try {
      const res = await axios.put(
        `/specialOffers/specialOffer/${editingOffer._id}`,
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setPopupLoading(false);
        fetchOffers();
        setEditModalOpen(false);
        resetForm();
      }
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      setPopupLoading(false);
    }
  };

  // Handle offer delete
  const handleDeleteOffer = async (id) => {
    try {
      const res = await axios.delete(`/specialOffers/specialOffer/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        setOffers((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.error("Error deleting offer:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-150 w-full p-5 border border-gray-300 rounded-2xl md:w-[90%] max-w-4xl mx-auto mt-5">
      {/* File Upload Section */}
      <form onSubmit={handleCreateOffer} className="space-y-6">
        {/* file upload */}
        <div className="flex sm:flex-row flex-wrap items-center justify-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="file"
              id="fileInput"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />
            <label
              htmlFor="fileInput"
              className="flex items-center justify-center w-full px-6 py-10 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
            >
              <div className="text-center">
                <Upload className="mx-auto h-10 w-10 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                    Click to upload
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG, PDF up to 10MB
                  </p>
                </div>
              </div>
            </label>
          </div>
          {logoPreview && (
            <div className="relative max-h-44 rounded-xl border border-gray-300 shadow-md bg-white">
              <img
                src={logoPreview}
                alt="Preview"
                className="w-full h-full max-h-44 object-cover rounded-2xl"
              />
              <button
                type="button"
                onClick={() => {
                  setLogoFile(null);
                  setLogoPreview(null);
                }}
                className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full p-1 cursor-pointer hover:bg-red-600 transition-all"
                title="Remove image"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Title Field */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Offer Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter offer description..."
          />
        </div>

        <div className="pt-3">
          <button
            onClick={handleUpdateOffer}
            disabled={loading}
            className={`px-5 py-2 rounded transition text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
      {/* Offers Table */}
      <div className="overflow-x-auto mt-10 px-4 rounded-xl">
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers?.map((item) => (
              <tr key={item._id} className="border-t border-gray-200">
                <td className="py-2 px-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="max-w-[100px] object-cover rounded-lg"
                  />
                </td>
                <td className="py-2 px-4 truncate overflow-hidden max-w-[200px]">
                  {item.title}
                </td>
                <td className="py-2 px-4 truncate overflow-hidden max-w-[300px]">
                  {item.description}
                </td>
                <td className="py-2 px-4">
                  <div className="flex flex-row items-center gap-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      <Edit size={18} />
                    </button>
                    |
                    <button
                      onClick={() => handleDeleteOffer(item._id)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {offers?.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No offers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg space-y-5 relative">
            <button
              onClick={() => {
                setEditModalOpen(false);
                resetForm();
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold">Edit Offer</h2>

            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-col gap-4">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Preview"
                  className="h-40 rounded-lg"
                />
              )}
            </div>
            <button
              onClick={handleUpdateOffer}
              disabled={popupLoding}
              className={`px-5 py-2 rounded transition text-white ${
                popupLoding
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {popupLoding ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;
