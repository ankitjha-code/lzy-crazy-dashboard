import React, { useState } from "react";
import {
  Delete,
  DeleteIcon,
  Edit,
  Edit2Icon,
  PlusCircle,
  Trash2,
} from "lucide-react";

const Hero_Section = () => {
  const [image, setImage] = useState("");
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const data = [
    {
      photo:
        "https://imgs.search.brave.com/p6-mxnlb38zbNnmfGawlb7rQJTQ1rlX4TKAnHUPXb4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vQTlwOTI0/MWNLTHN0bkVURXMx/SE1FUGxPTmxqeF8y/SkhEMlFCTDJOcERa/WS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl0/WldScC9ZUzVwYzNS/dlkydHdhRzkwL2J5/NWpiMjB2YVdRdk1U/TXgvTURVek9UQXdP/Qzl3YUc5MC9ieTl6/YUc5MExXOW1MV0V0/L2VXOTFibWN0ZDI5/dFpXNHQvZFhOcGJt/Y3RiVzlpYVd4bC9M/WEJvYjI1bExYTnZZ/MmxoL2JDMXRaV1Jw/WVMxemRYSm0vYVc1/bkxYUm9aUzF1WlhR/dC9jM1JoYm1ScGJt/Y3RhWE52L2JHRjBa/V1F0YjNabGNpNXEv/Y0djX2N6MDJNVEo0/TmpFeS9KbmM5TUNa/clBUSXdKbU05L2RF/ZGlXVWREYzFKMU1u/VTIvUTNFMVJsSjZX/blp1WVROWC9kR1I2/VjNWUk1uUTFheTFV/L2FscE9aRXRLZHow",
      title: " I am good",
      description: "Hello",
    },
    {
      photo:
        "https://imgs.search.brave.com/sqe0EUYwqOVBb-qwdJ5CcIEjNCjVU5QSSyU7sctM7ws/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vVHdOR2Zr/Wkd0aFVaMW82X1Rr/UTdlZ2MyOGVjUFNl/OUFReUZnZHowbllB/NC9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl0/WldScC9ZUzVuWlhS/MGVXbHRZV2RsL2N5/NWpiMjB2YVdRdk1U/WTMvTlRnNE1ERTFO/Qzl3YUc5MC9ieTlq/YUdWbGNtWjFiQzFt/L2NtbGxibVJ6TFdw/MWJYQnAvYm1jdGFH/bG5hQzExY0MxcC9i/aTF0YVdRdFlXbHlM/bXB3L1p6OXpQVFl4/TW5nMk1USW0vZHow/d0ptczlNakFtWXox/eC9lbDlhTURsSlVt/VjVlRUZQL2FtMXRa/bmRaWldOc2NHUm8v/VkdNNGVHcHZWbFpU/TFdOQi9kbWR3TkZW/elBR",
      title: "How are you",
      description: "Hii",
    },
  ];

  return (
    <div className="p-5">
      {" "}
      <div className="min-h-150 w-full p-5 border border-gray-400 rounded md:w-[90%] max-w-4xl mx-auto mt-5 ">
        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-3 w-32 h-32 rounded-lg object-cover border border-gray-300 mb-5"
          />
        )}
        <div className="w-full md:w-[80%] space-y-5">
          {/* File Input */}
          <div className="w-full md:w-[73%] border border-gray-400 text-gray-700 py-2 rounded-[7px]">
            <label
              htmlFor="file-upload"
              className="block w-[30%] mx-5 cursor-pointer bg-gray-200  text-center rounded-[7px]"
            >
              Upload File
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
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
        <div className="overflow-x-auto mt-5 px-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="py-2 px-4">
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.description}</td>
                  <td className="py-2 px-4">
                    <div className="flex flex-row items-center gap-3">
                      <div>
                        <button className="text-blue-600 flex flex-col items-center hover:underline cursor-pointer">
                          <Edit size={18} />
                        </button>
                      </div>
                      |
                      <div>
                        <button className="text-red-600 flex flex-col items-center hover:underline cursor-pointer">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Hero_Section;
