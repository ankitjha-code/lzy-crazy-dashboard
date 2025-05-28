import React from "react";

const Header = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Header Management</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Header Settings</h2>
        <p className="text-gray-600 mb-4">Configure your website's header appearance and navigation.</p>
        <div className="border p-4 rounded bg-gray-50 mb-4">
          <h3 className="font-medium mb-2">Logo</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
              Logo
            </div>
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Upload New
            </button>
          </div>
        </div>
        <div className="border p-4 rounded bg-gray-50">
          <h3 className="font-medium mb-2">Navigation Menu</h3>
          <p className="text-sm text-gray-500 mb-2">Customize your header navigation items</p>
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Edit Menu Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
