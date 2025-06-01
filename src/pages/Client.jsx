import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import instance from "../lib/axios/axiosInstance";
import { Edit, Trash2 } from "lucide-react";

const Client = () => {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [headTitle, setHeadTitle] = useState("");
  // const [image, setImage] = useState(null);

  const [TestimonialsList, setTestimonialsList] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [popupLoading, setLopupLoading] = useState(false);

  const [editProduct, setEditProduct] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editHeadTitle, setEditHeadTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);

  // const isFormComplete = description && title && headTitle;

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };

  // const handlePublish = async () => {
  //   setLoading(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", image);
  //     formData.append("title", title);
  //     formData.append("head_title", headTitle);
  //     formData.append("description", description);
  //     const { data } = await instance.post(
  //       "/testimonials/add-testimonial",
  //       formData
  //     );
  //     if (data.success) {
  //       toast.success(data.message);
  //       getTestimonialsList();
  //       setImage(null);
  //       setTitle("");
  //       setHeadTitle("");
  //       setDescription("");
  //       setLoading(false);
  //     } else {
  //       toast.error(data.message);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Error in Tetimonial", error);
  //     setLoading(false);
  //   }
  // };

  const deleteTestimonial = async (id) => {
    try {
      const { data } = await instance.delete(
        `/testimonials/delete-testimonial/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        setTestimonialsList((prev) =>
          prev.filter((product) => product._id !== id)
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const getTestimonialsList = async () => {
    try {
      const { data } = await instance.get("/testimonials/get-testimonial");
      if (data.success) {
        setTestimonialsList(data.testimonil);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleEditSave = async () => {
    setLopupLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("head_title", editHeadTitle);
      formData.append("description", editDescription);
      if (editImage) formData.append("image", editImage);

      const { data } = await instance.put(
        `/testimonials/update-testimonial/${editProduct._id}`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        setLopupLoading(false);
        setEditProduct(null);
        getTestimonialsList();
      }
    } catch (error) {
      setLopupLoading(false);
      toast.error("Update failed");
      console.error(error);
    }
  };

  useEffect(() => {
    getTestimonialsList();
  }, []);

  return (
    <div className="flex-grow p-2 sm:p-4 md:p-8 bg-[#f3f6fd] flex justify-center items-center">
      <div className="bg-white border border-gray-200 rounded-lg w-full max-w-full p-4 sm:p-8 md:p-12 mx-2 sm:mx-6 md:mx-12 mt-4">
        {/* File Upload Section */}
        {/* <div className="mb-5">
          <label className="block w-full cursor-pointer">
            <div className="py-2 px-3 text-gray-600 border border-gray-200 rounded-md bg-white w-full sm:w-[23vw] text-left">
              <span className="bg-[#efefef] p-[2px] border-[#acacac] border-[1px] rounded text-sm">
                Choose File
              </span>
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Head Title
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-1">
            <input
              type="text"
              className="w-full sm:w-[23vw] border border-gray-300 rounded-md py-2 px-2 text-sm focus:outline-none"
              value={headTitle}
              onChange={(e) => setHeadTitle(e.target.value)}
            />
          </div>
        </div> */}
        {/* Title Section */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-1">
            <input
              type="text"
              className="w-full sm:w-[23vw] border border-gray-300 rounded-md py-2 px-2 text-sm focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div> */}

        {/* Description Section */}
        {/* <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-1">
            <input
              type="text"
              className="w-full sm:w-[23vw] border border-gray-300 rounded-md py-2 px-2 text-sm focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div> */}

        {/* Publish Button */}
        {/* <button
          onClick={handlePublish}
          disabled={!isFormComplete || loading}
          className={`text-base font-semibold px-5 py-3 rounded mt-4 ${
            isFormComplete
              ? "bg-blue-500 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {loading ? "Loading..." : "Publish"}
        </button> */}
        {/* Product List */}
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
                            src={testimonial.image}
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
                          className="text-red-500  cursor-pointer"
                          onClick={() => deleteTestimonial(testimonial._id)}
                        />
                        <Edit
                          className="text-green-500 cursor-pointer"
                          onClick={() => {
                            setEditProduct(testimonial);
                            setEditTitle(testimonial.title);
                            setEditHeadTitle(testimonial.head_title);
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
            No products published yet.
          </p>
        )}

        {/* Edit Popup */}
        {editProduct && (
          <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
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
                type="text"
                value={editHeadTitle}
                onChange={(e) => setEditHeadTitle(e.target.value)}
                placeholder="Client Say"
                className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Client Say"
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
                  src={editProduct.image}
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
