import React from "react";
import {
  Delete,
  DeleteIcon,
  Edit,
  Edit2Icon,
  PlusCircle,
  Trash2,
} from "lucide-react";

const Hero_Section = () => {
  return (
    <div className="p-5">
      {" "}
      <div className="min-h-150 w-full p-5 border border-gray-400 rounded md:w-[90%] max-w-4xl mx-auto mt-5 ">
        <div className="w-full md:w-[80%] space-y-5">
          {/* File Input */}
          <div className="w-full md:w-[73%] border border-gray-400 text-gray-700 py-2 rounded-[7px]">
            <label
              htmlFor="file-upload"
              className="block w-[30%] mx-5 cursor-pointer bg-gray-200  text-center rounded-[7px]"
            >
              Upload File
            </label>
            <input id="file-upload" type="file" className="hidden" />
          </div>

          {/* Home Input and Add Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="home" className="font-semibold block mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-500 p-2 rounded-[7px]"
              />
            </div>

            <div className="flex items-end">
              <button className="flex items-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
                  <PlusCircle />
                </span>
                <span className="text-sm font-semibold ml-2">Add</span>
              </button>
            </div>
            <div className="flex items-end">
              <button className="flex items-center  cursor-pointer">
                <span className="text-green-500  w-8 h-8 flex items-center justify-center text-sm">
                  <Edit />
                </span>
              </button>
            </div>
            <div className="flex items-end">
              <button className="flex items-center  cursor-pointer">
                <span className="text-red-500 w-8 h-8 flex items-center justify-center text-sm">
                  <Trash2 />
                </span>
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="home" className="font-semibold block mb-1">
                Description
              </label>
              <input
                type="text"
                className="w-full border border-gray-500 p-2 rounded-[7px]"
              />
            </div>

            <div className="flex items-end">
              <button className="flex items-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
                  <PlusCircle />
                </span>
                <span className="text-sm font-semibold ml-2">Add</span>
              </button>
            </div>
            <div className="flex items-end">
              <button className="flex items-center  cursor-pointer">
                <span className="text-green-500  w-8 h-8 flex items-center justify-center text-sm">
                  <Edit />
                </span>
              </button>
            </div>
            <div className="flex items-end">
              <button className="flex items-center cursor-pointer">
                <span className="text-red-500  w-8 h-8 flex items-center justify-center text-sm">
                  <Trash2 />
                </span>
              </button>
            </div>
          </div>

          {/* Publish Button */}
          <div className="pt-5">
            <button className="bg-blue-600 text-white px-8 py-2 rounded-md text-lg hover:bg-blue-700 transition">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero_Section;
