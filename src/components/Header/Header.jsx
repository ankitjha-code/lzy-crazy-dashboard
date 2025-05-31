import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, Upload, X } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "../../lib/axios/axiosInstance";

const Header = () => {

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [navItems, setNavItems] = useState([{ label: "", link: "" }]);
  const [headerExists, setHeaderExists] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // Handle logo file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };


  // Add a new empty navItem row
  const handleAddNavItem = () => {
    setNavItems([...navItems, { label: "", link: "" }]);
  };

  // Handle changes to nav item inputs
  const handleNavItemChange = (index, field, value) => {
    const updated = [...navItems];
    updated[index][field] = value;
    setNavItems(updated);
  };

  // Delete nav item
  const handleDeleteNavItem = (index) => {
    const updated = navItems.filter((_, i) => i !== index);
    setNavItems(updated);
  };

  // Fetch existing header on mount
  useEffect(() => {
    const fetchHeader = async () => {
      console.log(user);
      try {
        const res = await axios.post("/header/get", { userId: user._id });
        const header = res.data;
        if (header) {
          setHeaderExists(true);
          setNavItems(header.navItems);
          setLogoPreview(header.logoUrl);
        }
      } catch (err) {
        console.log("No header found; will create new one.");
      }
    };

    if (user?._id) fetchHeader();
  }, [user]);

  // Publish (create or update)
  const handlePublish = async () => {
    if (!logoFile && navItems.every((item) => !item.label || !item.link)) {
      return alert("Please add a logo or at least one valid nav link.");
    }

    const formData = new FormData();
    if (logoFile) formData.append("logo", logoFile);
    formData.append("navItems", JSON.stringify(navItems));

    try {
      const res = headerExists
        ? await axios.put("/header/update", formData)
        : await axios.post("/header/create", formData);

      alert(res.data.message || "Header saved.");
      setHeaderExists(true);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to publish header.");
    }
  };


  return (
  <div className="min-h-screen w-full px-4 py-6 md:p-10 bg-gray-50">
    <div className="w-full mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10">
      <div className="w-full mx-auto md:w-[55%] space-y-8">
        {/* File Upload Section */}
        <div className="flex flex-1 sm:flex-row items-center justify-center gap-4">
          <div className="relative">
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
              <div className="relative aspect-square h-44 rounded-xl border border-gray-300 shadow-md bg-white">
                <img
                  src={logoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setLogoPreview(null)}
                  className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full p-1 cursor-pointer hover:bg-red-600 transition-all"
                  title="Remove image"
                >
                  <X size={20} />
                </button>
              </div>
            )}
        </div>

        {/* Nav Items Section */}
        <div className="space-y-5">
          {navItems.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <input
                type="text"
                placeholder="Label (e.g. Home)"
                value={item.label}
                onChange={(e) => handleNavItemChange(index, "label", e.target.value)}
                className="w-full flex-1 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 rounded-lg shadow-sm text-sm"
              />
              <input
                type="text"
                placeholder="Link (e.g. /home)"
                value={item.link}
                onChange={(e) => handleNavItemChange(index, "link", e.target.value)}
                className="w-full flex-1 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none px-4 py-2 rounded-lg shadow-sm text-sm"
              />
              <button
                onClick={() => handleDeleteNavItem(index)}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete link"
              >
                <Trash2 />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddNavItem}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition"
          >
            <PlusCircle /> Add Link
          </button>
        </div>

        {/* Publish Button */}
        <div className="pt-6">
          <button
            onClick={handlePublish}
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg text-base font-semibold hover:bg-blue-700 transition-all"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Header;


