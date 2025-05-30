import React, { useState } from "react";

const Footer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [socialIcons, setSocialIcons] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [dayTimes, setDayTimes] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      console.log("Selected file:", file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
  };

  const handleAddSocialIcon = (e) => {
    const files = Array.from(e.target.files);
    const newIcons = files.map((file) => ({
      id: Date.now() + Math.random(),
      file: URL.createObjectURL(file),
      link: "",
    }));
    setSocialIcons((prev) => [...prev, ...newIcons]);
  };

  const handleLinkChange = (id, value) => {
    setSocialIcons((prev) =>
      prev.map((icon) => (icon.id === id ? { ...icon, link: value } : icon))
    );
  };

  const handleRemoveSocialIcon = (id) => {
    setSocialIcons((prev) => prev.filter((icon) => icon.id !== id));
  };

  const handleAddRecentPost = () => {
    setRecentPosts((prev) => [...prev, { id: Date.now(), name: "", link: "" }]);
  };

  const handleRecentPostChange = (id, field, value) => {
    setRecentPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, [field]: value } : post))
    );
  };

  const handleRemoveRecentPost = (id) => {
    setRecentPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleAddDayTime = () => {
    setDayTimes((prev) => [...prev, { id: Date.now(), day: "", time: "" }]);
  };

  const handleDayTimeChange = (id, field, value) => {
    setDayTimes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemoveDayTime = (id) => {
    setDayTimes((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <form className="w-full card-container max-w-[1550px] mx-auto min-h-screen bg-white rounded-xl border border-gray-200 shadow-md mb-8 px-1 py-6 md:p-6">
      <div className="flex gap-5">
        <div className="w-1/2 bg-white rounded-xl border border-gray-200 shadow-md p-4 text-white">
          <label className="text-black text-2xl">Logo and Social Icon</label>

          <div className="relative flex items-start mt-5">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-72 h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition p-4 bg-white"
            >
              <div className="flex flex-col items-center justify-center pt-2 pb-4">
                <svg
                  className="w-8 h-8 mb-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinejoin="round"
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4"
                  />
                </svg>
                <p className="mb-1 text-sm text-gray-500">
                  <span className="font-semibold text-blue-600">
                    Click to upload file
                  </span>
                </p>
                <p className="text-xs text-gray-400">PNG up to 10MB</p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".png"
                onChange={handleFileChange}
              />
            </label>

            {selectedFile && (
              <div className="relative ml-8 w-70 h-36 rounded-lg overflow-hidden border border-gray-300 shadow-md bg-white">
                <img
                  src={selectedFile}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-bl p-2 hover:bg-red-700"
                  title="Remove photo"
                >
                  &#10005;
                </button>
              </div>
            )}
          </div>

          <div className="mt-6">
            <label className="font-semibold block mb-2 text-black">
              Upload Social Icons (Multiple)
            </label>

            <label
              htmlFor="social-upload"
              className="flex flex-col items-center justify-center w-72 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition p-4 bg-white"
            >
              <div className="flex flex-col items-center justify-center">
                <svg
                  className="w-6 h-6 mb-1 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p className="text-sm text-gray-500 text-center">
                  <span className="text-blue-600 font-medium">
                    Click to upload
                  </span>{" "}
                  social icons (PNG, JPG)
                </p>
              </div>
              <input
                id="social-upload"
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.svg"
                onChange={handleAddSocialIcon}
                className="hidden"
              />
            </label>

            <div className="mt-4 space-y-4">
              {socialIcons.map((icon) => (
                <div
                  key={icon.id}
                  className="flex items-center gap-4 border border-gray-300 p-2 rounded-lg"
                >
                  <div className="relative w-16 h-16 overflow-hidden border border-gray-300 rounded-md">
                    <img
                      src={icon.file}
                      alt="icon"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSocialIcon(icon.id)}
                      className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl hover:bg-red-700"
                      title="Remove"
                    >
                      &#10005;
                    </button>
                  </div>
                  <input
                    type="url"
                    placeholder="https://your-link.com"
                    className="flex-1 border border-gray-400 p-2 rounded-md text-black"
                    value={icon.link}
                    onChange={(e) => handleLinkChange(icon.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 mt-6">
            <label
              htmlFor="home"
              className="font-semibold block mb-1 text-black"
            >
              Description
            </label>
            <textarea
              id="home"
              rows={2}
              className="w-full border border-gray-500 p-2 rounded-[7px] resize-none placeholder-gray-400 text-gray-900 text-base"
              placeholder="Enter description here..."
            ></textarea>
          </div>
        </div>

        <div className="w-1/2 bg-white rounded-xl border border-gray-200 shadow-md p-4 text-white">
          <label className="text-black text-2xl">
            Resent Post and Working Hours
          </label>
          <div className="mt-[50px] text-center">
            <label className="font-semibold block mb-2 text-black">
              Recent Posts (Name + Link)
            </label>

            <button
              type="button"
              onClick={handleAddRecentPost}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Recent Post
            </button>

            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 border border-gray-300 p-2 rounded-lg"
                >
                  <input
                    type="text"
                    placeholder="Enter Post Name"
                    className="w-1/2 border border-gray-400 p-2 rounded-md text-black"
                    value={post.name}
                    onChange={(e) =>
                      handleRecentPostChange(post.id, "name", e.target.value)
                    }
                  />
                  <input
                    type="url"
                    placeholder="https://link-to-post.com"
                    className="w-1/2 border border-gray-400 p-2 rounded-md text-black"
                    value={post.link}
                    onChange={(e) =>
                      handleRecentPostChange(post.id, "link", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRecentPost(post.id)}
                    className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                    title="Remove post"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[70px] text-center mt-9">
            <label className="font-semibold block mb-2 text-black">
              Working Days & Time
            </label>

            <button
              type="button"
              onClick={handleAddDayTime}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Day & Time
            </button>

            <div className="space-y-4">
              {dayTimes.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border border-gray-300 p-2 rounded-lg"
                >
                  <input
                    type="text"
                    placeholder="Enter Day (e.g., Monday)"
                    className="w-1/2 border border-gray-400 p-2 rounded-md text-black"
                    value={item.day}
                    onChange={(e) =>
                      handleDayTimeChange(item.id, "day", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter Time (e.g., 10:00 AM - 5:00 PM)"
                    className="w-1/2 border border-gray-400 p-2 rounded-md text-black"
                    value={item.time}
                    onChange={(e) =>
                      handleDayTimeChange(item.id, "time", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDayTime(item.id)}
                    className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                    title="Remove"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4 mt-[75px]">
            <div className="w-1/2">
              <label
                htmlFor="address"
                className="font-semibold block mb-1 text-black"
              >
                Address
              </label>
              <textarea
                id="address"
                rows={1}
                className="w-full border border-gray-500 p-2 rounded-[7px] resize-none placeholder-gray-400 text-gray-900 text-base"
                placeholder="Enter address here..."
              ></textarea>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="phone"
                className="font-semibold block mb-1 text-black"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full border border-gray-500 p-2 rounded-[7px] placeholder-gray-400 text-gray-900 text-base"
                placeholder="Enter phone number..."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-9 text-center">
        <button className="bg-blue-600 text-white px-8 py-2 rounded-md text-lg hover:bg-blue-700 transition">
          Publish
        </button>
      </div>
    </form>
  );
};

export default Footer;
