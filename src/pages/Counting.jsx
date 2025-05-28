import React from "react";

const Counting = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Counting Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-1">Total Clients</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold mr-2">1,254</span>
            <span className="text-green-500 text-xs">+12%</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-1">Projects Completed</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold mr-2">879</span>
            <span className="text-green-500 text-xs">+8%</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-1">Hours Worked</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold mr-2">24,567</span>
            <span className="text-green-500 text-xs">+15%</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-1">Awards Won</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold mr-2">32</span>
            <span className="text-green-500 text-xs">+5%</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Edit Counter Items</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Counter Title</label>
              <input type="text" className="w-full border rounded px-3 py-2" defaultValue="Total Clients" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
              <input type="number" className="w-full border rounded px-3 py-2" defaultValue="1254" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Counter Title</label>
              <input type="text" className="w-full border rounded px-3 py-2" defaultValue="Projects Completed" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
              <input type="number" className="w-full border rounded px-3 py-2" defaultValue="879" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counting;
