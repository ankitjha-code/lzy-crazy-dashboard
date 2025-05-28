import React, { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";

const AboutUsForm = () => {
  const [aboutText, setAboutText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [tempList, setTempList] = useState([]);
  const [aboutList, setAboutList] = useState([]);
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
    if (!aboutText.trim() || !selectedImage) return;

    const newItem = {
      text: aboutText.trim(),
      image: selectedImage,
    };

    setTempList([...tempList, newItem]);
    setAboutText("");
    setSelectedImage(null);
  };

  const handlePublish = () => {
    if (tempList.length === 0) return;

    const updatedList = [...aboutList, ...tempList];
    setAboutList(updatedList);
    setTempList([]);
  };

  const handleDelete = (index) => {
    const updated = aboutList.filter((_, i) => i !== index);
    setAboutList(updated);
  };

  const handleEdit = (index) => {
    const item = aboutList[index];
    setAboutText(item.text);
    setSelectedImage(item.image);
    setEditingIndex(index);
  };

  const handleUpdate = () => {
    if (!aboutText.trim() || !selectedImage || editingIndex === null) return;

    const updatedList = [...aboutList];
    updatedList[editingIndex] = {
      text: aboutText.trim(),
      image: selectedImage,
    };

    setAboutList(updatedList);
    setAboutText("");
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

      {/* About Text Input */}
      <label className="block text-base font-semibold mb-2">About Us</label>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          placeholder="Enter about text"
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
        disabled={tempList.length === 0}
        className={`text-base font-semibold px-8 py-3 rounded transition ${
          tempList.length === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Publish
      </button>

      {/* Unpublished About Us Items */}
      {tempList.length > 0 && (
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-600 mb-2">
            Unpublished About Us Content:
          </h3>
          <ul className="list-disc list-inside text-gray-500">
            {tempList.map((item, idx) => (
              <li key={idx}>{item.text}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Published About Us Table */}
      {aboutList.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Published About Us Content
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left border-b">Image</th>
                  <th className="py-3 px-4 text-left border-b">Text</th>
                  <th className="py-3 px-4 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {aboutList.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">
                      <img
                        src={item.image}
                        alt="about"
                        className="w-16 h-16 object-cover rounded border"
                      />
                    </td>
                    <td className="py-3 px-4 text-base">{item.text}</td>
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
          No about us content published yet.
        </p>
      )}
    </div>
  );
};

export default AboutUsForm;
