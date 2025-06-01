import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import instance from "../lib/axios/axiosInstance";
import { Edit, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const Client = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [TestimonialsList, setTestimonialsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupLoading, setLopupLoading] = useState(false);

  const [editProduct, setEditProduct] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  // Fixed validation to check for trimmed values
  const isFormComplete = description && title;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // ...existing code...

  const handlePublish = async () => {
    if (!isFormComplete) {
      toast.error("Please fill in all fields and select an image");
      return;
    }

    setLoading(true);
    try {
      if (image) formData.append("image", image);

      const { data } = await instance.post(
        "/testimonials/add-testimonial",
        {
          image: image,
          title: title,
          description: description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data) {
        toast.success(data.message || "Testimonial added successfully");
        getTestimonialsList();
        setImage(null);
        setTitle("");
        setDescription("");
      } else {
        toast.error(data.message || "Failed to add testimonial");
      }
    } catch (error) {
      console.log("Error details:", error.response?.data);
      toast.error(error.response?.data?.message || "Error in Testimonial");
    }
    setLoading(false);
  };

  // ...existing code...

  const deleteTestimonial = async (id) => {
    try {
      const response = await instance.delete(
        `/testimonials/delete-testimonial/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response?.data;
      if (data) {
        toast.success(data.message || "Testimonial deleted successfully");
        getTestimonialsList(); // Refresh the list after deletion
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const getTestimonialsList = async () => {
    try {
      const { data } = await instance.post(
        "/testimonials/get-testimonial",
        { userId: user._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API Response:", data); // Debug logging

      // Fixed to handle different response formats
      if (data.success && Array.isArray(data.testimonials)) {
        setTestimonialsList(data.testimonials);
      } else if (Array.isArray(data)) {
        setTestimonialsList(data);
      } else if (data && typeof data === "object") {
        // Handle case where response might have testimonials in a different property
        const testimonials =
          data.testimonials || data.data || data.result || [];
        setTestimonialsList(Array.isArray(testimonials) ? testimonials : []);
      } else {
        setTestimonialsList([]);
      }
    } catch (error) {
      console.log("Testimonials fetch error:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch testimonials"
      );
    }
  };

  const handleEditSave = async () => {
    setLopupLoading(true);
    try {
      const { data } = await instance.put(
        `/testimonials/update-testimonial/${editProduct._id}`,
        {
          title: editTitle,
          description: editDescription,
          image: editImage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message || "Testimonial updated successfully");
        setLopupLoading(false);
        setEditProduct(null);
        getTestimonialsList();
      } else {
        toast.error(data.message || "Update failed");
        setLopupLoading(false);
      }
    } catch (error) {
      setLopupLoading(false);
      toast.error(error.response?.data?.message || "Update failed");
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getTestimonialsList();
    }
  }, []);

  return (
    <div className="flex-grow p-2 sm:p-4 md:p-8 bg-[#f3f6fd] flex justify-center items-center">
      <div className="bg-white border border-gray-200 rounded-lg w-full max-w-full p-4 sm:p-8 md:p-12 mx-2 sm:mx-6 md:mx-12 mt-4">
        {/* File Upload Section */}
        <div className="mb-5">
          <label className="block w-full cursor-pointer">
            <div className="py-2 px-3 text-gray-600 border border-gray-200 rounded-md bg-white w-full sm:w-[23vw] text-left">
              <span className="bg-[#efefef] p-[2px] border-[#acacac] border-[1px] rounded text-sm">
                Choose File
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
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

        {/* Title Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-1">
            <input
              type="text"
              className="w-full sm:w-[23vw] border border-gray-300 rounded-md py-2 px-2 text-sm focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-1">
            <textarea
              className="w-full sm:w-[23vw] border border-gray-300 rounded-md py-2 px-2 text-sm focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Publish Button */}
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


        {/* Testimonials List */}
        {TestimonialsList?.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
              Published Client Review
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left border-b">Image</th>
                    <th className="py-3 px-4 text-left border-b">Title</th>
                    <th className="py-3 px-4 text-left border-b">
                      Client Title
                    </th>
                    <th className="py-3 px-4 text-left border-b">
                      Description
                    </th>
                    <th className="py-3 px-4 text-left border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {TestimonialsList.map((testimonial, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-4">
                        {testimonial.image ? (
                          <img
                            src={
                              testimonial.image.startsWith("http")
                                ? testimonial.image
                                : `http://localhost:4000/${testimonial.image}`
                            }
                            alt={testimonial.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-3 px-4">{testimonial.title}</td>
                      <td className="py-3 px-4">{testimonial.head_title}</td>
                      <td className="py-3 px-4">{testimonial.description}</td>
                      <td className="py-3 px-4 flex gap-3 items-center">
                        <Trash2
                          className="text-red-500 cursor-pointer"
                          onClick={() => deleteTestimonial(testimonial._id)}
                        />
                        <Edit
                          className="text-green-500 cursor-pointer"
                          onClick={() => {
                            setEditProduct(testimonial);
                            setEditTitle(testimonial.title);
                            setEditDescription(testimonial.description);
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
            No testimonials published yet.
          </p>
        )}

        {/* Edit Popup */}
        {editProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
              <h2 className="text-lg font-semibold mb-4">Edit Testimonial</h2>

              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
              />

              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
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
    </div>
  );
};

export default Client;
