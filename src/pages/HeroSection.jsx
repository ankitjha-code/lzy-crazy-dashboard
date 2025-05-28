import React from "react";

const HeroSection = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hero Section</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Hero Content</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heading
          </label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter hero heading"
            defaultValue="Welcome to LZY CRAZY"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subheading
          </label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter subheading"
            defaultValue="Your creative solution partner"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
            <p className="text-sm text-gray-500">Upload a new image or select from library</p>
            <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Browse Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
