import React from "react";

const Profile = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-4">
            <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow flex items-center justify-center mb-2 md:mb-0 overflow-hidden">
              <div className="text-blue-500 text-5xl font-bold">LC</div>
            </div>
            <div className="md:ml-6 text-center md:text-left">
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-gray-500">Administrator</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full border rounded px-3 py-2" defaultValue="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" className="w-full border rounded px-3 py-2" defaultValue="john.doe@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" className="w-full border rounded px-3 py-2" defaultValue="+1 (555) 987-6543" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input type="text" className="w-full border rounded px-3 py-2" defaultValue="Administrator" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input type="text" className="w-full border rounded px-3 py-2" defaultValue="johndoe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" className="w-full border rounded px-3 py-2" defaultValue="********" />
                </div>
                <div className="pt-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">Receive email notifications</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">Enable two-factor authentication</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
