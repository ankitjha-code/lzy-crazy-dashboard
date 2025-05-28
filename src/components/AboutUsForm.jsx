import React, { useState } from "react";
import { Plus } from "lucide-react";

const AboutUsForm = () => {
  const [aboutText, setAboutText] = useState("");

  const handleAdd = () => {
    console.log("About Us Added:", aboutText);
    setAboutText("");
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
          className="block w-60 border border-gray-300 rounded px-4 py-3 text-base"
        />
      </div>

      {/* About Us Input */}
      <label className="block text-base font-semibold mb-2">About Us</label>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          placeholder="Enter about text"
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

export default AboutUsForm;
