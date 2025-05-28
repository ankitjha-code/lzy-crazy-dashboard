import React, { useState } from 'react';

const Client = () => {
  const [title, setTitle] = useState('Laser Skin Discover a sanctuary of beauty and relaxation');
  const [description, setDescription] = useState('Laser Skin Discover a sanctuary of beauty and relaxation');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handlePublish = () => {
    console.log({ file, title, description });
    // Implementation would go here
  };

  return (
    <div className="flex-grow p-2 sm:p-4 md:p-8 bg-[#f3f6fd] flex justify-center items-center">
      <div className="bg-white border border-gray-200 rounded-lg w-full max-w-full p-4 sm:p-8 md:p-12 mx-2 sm:mx-6 md:mx-12 mt-4">
        
        {/* File Upload Section */}
        <div className="mb-5">
          <label className="block w-full cursor-pointer">
            <div className="py-2 px-3 text-gray-600 border border-gray-200 rounded-md bg-white w-full sm:w-[23vw] text-left">
              <span className="bg-[#efefef] p-[2px] border-[#acacac] border-[1px] rounded text-sm">Choose File</span>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Title Section */}
        <div className="mb-4">
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
            <div className="flex gap-4 items-center mt-2 sm:mt-0 sm:ml-3">
            <button className="flex items-center justify-center rounded-sm border border-blue-600 border-[1px] text-black px-2 py-1 text-xs sm:text-sm">
                <span className="mr-1 font-bold bg-[blue]  text-white border-[blue] border-[1px] rounded-[100%] p-[1px] flex items-center justify-center !pb-[2px] w-[16px] h-[16px]">+</span> Add
              </button>
              <button className="mx-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
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
            <div className="flex gap-4 items-center mt-2 sm:mt-0 sm:ml-3">
              <button className="flex items-center justify-center rounded-sm border border-blue-600 border-[1px] text-black px-2 py-1 text-xs sm:text-sm">
                <span className="mr-1 font-bold bg-[blue]  text-white border-[blue] border-[1px] rounded-[100%] p-[1px] flex items-center justify-center !pb-[2px] w-[16px] h-[16px]">+</span> Add
              </button>
              <button className="mx-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Publish Button */}
        <div className="mt-4 sm:mt-2">
          <button
            onClick={handlePublish}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-5 w-full sm:w-auto rounded-md text-sm"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Client;
