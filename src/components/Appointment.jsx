import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, Plus, Edit2, Trash2, FileText, X } from "lucide-react";

const Appointment = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [titleItems, setTitleItems] = useState([
    "Laser Skin Discover a sanctuary of beauty and relaxation",
  ]);
  const [descriptionItems, setDescriptionItems] = useState([
    "Laser Skin Discover a sanctuary of beauty and relaxation",
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    const submitData = {
      ...data,
      file: selectedFile,
      titleItems,
      descriptionItems,
    };
    console.log("Form submitted:", submitData);
    alert("Form submitted successfully!");
    reset();
    setSelectedFile(null);
    document.getElementById("fileInput").value = "";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="w-full max-w-[1550px] mx-auto min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Choose File
            </label>
            <div className="relative">
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
              <label
                htmlFor="fileInput"
                className="flex items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 group"
              >
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  <div className="mt-4">
                    <p className="text-base sm:text-lg font-medium text-gray-700 group-hover:text-blue-600">
                      Click to upload file
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
              </label>

              {selectedFile && (
                <div className="mt-3 flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <FileText className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-800 truncate">
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-green-600 flex-shrink-0">
                      ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1 hover:bg-green-100 rounded-full transition-colors duration-200 flex-shrink-0 ml-2"
                  >
                    <X className="h-4 w-4 text-green-600" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Title
            </label>

            <div className="flex items-center gap-y-2 flex-wrap space-x-2 sm:space-x-3">
              <input
                type="text"
                {...register("title", {
                  required: "title is required",
                  minLength: {
                    value: 2,
                    message: "Title must be at least 2 characters",
                  },
                })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Title"
              />

              <div className="flex items-center justify-between space-x-4 md:space-x-2 flex-shrink-0">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Add
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Description
            </label>

            <div className="flex items-center flex-wrap gap-y-2 space-x-2 sm:space-x-3">
              <input
                type="text"
                {...register("description", {
                  required: "description is required",
                  minLength: {
                    value: 2,
                    message: "description must be at least 2 characters",
                  },
                })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Description"
              />
              <div className="flex items-center justify-between space-x-4 md:space-x-2 flex-shrink-0">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Add
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Form Fields Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Form Fields</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[\d\s\-\(\)]{10,}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  placeholder="Message"
                  rows="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base resize-vertical"
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors text-sm sm:text-base"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
