import React from "react";

const Banner = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Banner Management</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Current Banners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border rounded p-3">
            <div className="bg-gray-200 h-32 mb-2 flex items-center justify-center">
              Banner Preview 1
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Main Banner</span>
              <div>
                <button className="text-blue-500 mr-2 text-sm">Edit</button>
                <button className="text-red-500 text-sm">Delete</button>
              </div>
            </div>
          </div>
          <div className="border rounded p-3">
            <div className="bg-gray-200 h-32 mb-2 flex items-center justify-center">
              Banner Preview 2
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Promotion Banner</span>
              <div>
                <button className="text-blue-500 mr-2 text-sm">Edit</button>
                <button className="text-red-500 text-sm">Delete</button>
              </div>
            </div>
          </div>
        </div>
        <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add New Banner
        </button>
      </div>
    </div>
  );
};

export default Banner;
