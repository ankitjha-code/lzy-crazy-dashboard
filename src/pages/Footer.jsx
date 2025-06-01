import React, { useState, useRef, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github, Globe, ChevronDown, X, Trash2, Edit } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [socialIcons, setSocialIcons] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [dayTimes, setDayTimes] = useState([]);
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedSocialPlatform, setSelectedSocialPlatform] = useState(null);
  const [socialLink, setSocialLink] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Function to fetch existing footer data
  const fetchFooterData = async () => {
    setFetchLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('http://localhost:4000/api/footer/test');
      
      if (response.data.success && response.data.footer) {
        const { footer } = response.data;
        
        // Store the footer data for preview
        setFooterData(footer);
        
        if (isEditing) {
          // Set basic fields
          setAddress(footer.address || '');
          setPhone(footer.phone || '');
          setDescription(footer.description || '');
          
          // Set social icons if available
          if (footer.socialIcons && footer.socialIcons.length > 0) {
            setSocialIcons(footer.socialIcons);
          }
          
          // Set recent posts if available
          if (footer.recentPosts && footer.recentPosts.length > 0) {
            setRecentPosts(footer.recentPosts);
          }
          
          // Set day times if available
          if (footer.dayTimes && footer.dayTimes.length > 0) {
            setDayTimes(footer.dayTimes);
          }
          
          // Set logo if available
          if (footer.logoUrl) {
            setSelectedFile(footer.logoUrl);
          }
        }
        
        toast.success('Footer data loaded successfully!');
      }
    } catch (err) {
      setError(err.message || 'Error loading footer data');
      toast.error('Failed to load footer data');
      console.error('Error loading footer data:', err);
    } finally {
      setFetchLoading(false);
    }
  };
  
  // Load footer data into form for editing
  const handleEditFooter = () => {
    setIsEditing(true);
    if (footerData) {
      // Set basic fields
      setAddress(footerData.address || '');
      setPhone(footerData.phone || '');
      setDescription(footerData.description || '');
      
      // Set social icons if available
      if (footerData.socialIcons && footerData.socialIcons.length > 0) {
        setSocialIcons(footerData.socialIcons);
      } else {
        setSocialIcons([]);
      }
      
      // Set recent posts if available
      if (footerData.recentPosts && footerData.recentPosts.length > 0) {
        setRecentPosts(footerData.recentPosts);
      } else {
        setRecentPosts([]);
      }
      
      // Set day times if available
      if (footerData.dayTimes && footerData.dayTimes.length > 0) {
        setDayTimes(footerData.dayTimes);
      } else {
        setDayTimes([]);
      }
      
      // Set logo if available
      if (footerData.logoUrl) {
        setSelectedFile(footerData.logoUrl);
      } else {
        setSelectedFile(null);
      }
      
      // Scroll to the top of the form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // State for footer preview
  const [footerData, setFooterData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Fetch footer data when component mounts
  useEffect(() => {
    fetchFooterData();
  }, []);
  
  // Delete footer function
  const handleDeleteFooter = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete('http://localhost:4000/api/footer/test');
      if (response.data.success) {
        toast.success('Footer deleted successfully!');
        // Reset form
        setSelectedFile(null);
        setSocialIcons([]);
        setRecentPosts([]);
        setDayTimes([]);
        setAddress('');
        setPhone('');
        setFooterData(null);
      } else {
        throw new Error(response.data.message || 'Failed to delete footer');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete footer');
      console.error('Error deleting footer:', err);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

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

  // Define social platforms with their respective icons
  const socialPlatforms = [
    { id: 'facebook', name: 'Facebook' },
    { id: 'twitter', name: 'Twitter' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'github', name: 'GitHub' },
    { id: 'website', name: 'Website' },
  ];

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSocialDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelectSocialPlatform = (platform) => {
    setSelectedSocialPlatform(platform);
    setShowSocialDropdown(false);
    setShowLinkModal(true);
    setSocialLink('');
  };

  const handleAddSocialIcon = () => {
    if (selectedSocialPlatform && socialLink) {
      const newIcon = {
        id: Date.now() + Math.random(),
        platform: selectedSocialPlatform,
        link: socialLink,
      };
      setSocialIcons((prev) => [...prev, newIcon]);
      setShowLinkModal(false);
      setSelectedSocialPlatform(null);
      setSocialLink('');
    }
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIsEditing(false);
    
    try {
      // First, upload the logo file if it exists
      let logoUrl = null;
      
      if (fileInputRef.current && fileInputRef.current.files[0]) {
        console.log('Uploading logo file first...');
        const fileData = new FormData();
        fileData.append('logo', fileInputRef.current.files[0]);
        
        try {
          // Upload to the dedicated file upload endpoint
          const fileResponse = await axios.post('http://localhost:4000/api/footer/upload', fileData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          
          console.log('File upload response:', fileResponse.data);
          if (fileResponse.data.success) {
            logoUrl = fileResponse.data.logoUrl;
            toast.success('Logo uploaded successfully!');
          }
        } catch (fileErr) {
          console.error('File upload error:', fileErr);
          toast.error('Logo upload failed. Will proceed with other data.');
        }
      }
      
      // Now create footer data with the logo URL if available
      const footerData = {
        address: address || '',
        phone: phone || '',
        description: description || '',
        socialIcons: socialIcons,
        recentPosts: recentPosts,
        dayTimes: dayTimes
      };
      
      // Add the logo URL if it was successfully uploaded
      if (logoUrl) {
        footerData.logoUrl = logoUrl;
      }
      
      console.log('Sending footer data to server with logoUrl:', logoUrl);
      const response = await axios.post('http://localhost:4000/api/footer/test', footerData);
      
      console.log('Server response:', response.data);
      
      if (response.data.success) {
        toast.success('Footer data saved successfully!');
        // Update the footer preview data
        setFooterData(response.data.footer);
      } else {
        throw new Error(response.data.message || 'Failed to save footer data');
      }
    } catch (err) {
      setError(`Error saving footer data: ${err.message}`);
      toast.error(err.message || 'Failed to save footer data');
      console.error('Error details:', err);
      
      // Fall back to simple JSON without FormData if there was an error
      if (err.message.includes('Network Error') || err.message.includes('connection')) {
        try {
          toast.info('Trying alternative submission method...');
          // Try with simple JSON
          const simpleData = {
            address: address || '',
            phone: phone || ''
          };
          
          const fallbackResponse = await axios.post('http://localhost:4000/api/footer/test', simpleData);
          console.log('Fallback response:', fallbackResponse.data);
          toast.success('Basic data saved with fallback method!');
        } catch (fallbackErr) {
          console.error('Fallback error:', fallbackErr);
          toast.error('All submission methods failed.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1550px] mx-auto mb-8">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="card-container bg-white rounded-xl border border-gray-200 shadow-md px-1 py-6 md:p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2 bg-white rounded-xl border border-gray-200 shadow-md p-4 text-white">
          <label className="text-black text-xl sm:text-2xl">
            Logo 
          </label>

          <div className="relative flex flex-col sm:flex-row items-start mt-5 gap-4">
            <label
              htmlFor="file_input"
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed ${selectedFile ? "border-green-500" : "border-gray-300"} rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100`}
            >
              {selectedFile ? (
                <div className="relative w-full h-full">
                  <img
                    src={selectedFile}
                    alt="Selected logo"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                  >
                    &#10005;
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
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
              )}
              <input
                id="file_input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </label>

            {selectedFile && (
              <div className="relative w-full sm:w-70 h-36 rounded-lg overflow-hidden border border-gray-300 shadow-md bg-white">
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
              Add Social Media Links
            </label>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowSocialDropdown(!showSocialDropdown)}
                className="flex items-center justify-between w-full sm:w-72 p-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-blue-500 transition"
              >
                <span>Select social media platform</span>
                <ChevronDown size={18} />
              </button>

              {showSocialDropdown && (
                <div className="absolute z-10 mt-1 w-full sm:w-72 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {socialPlatforms.map((platform) => (
                    <button
                      key={platform.id}
                      type="button"
                      className="flex text-black items-center gap-3 w-full p-3 hover:bg-gray-100 text-left"
                      onClick={() => handleSelectSocialPlatform(platform)}
                    >
                      {platform.id === 'facebook' && <Facebook size={20} />}
                      {platform.id === 'twitter' && <Twitter size={20} />}
                      {platform.id === 'instagram' && <Instagram size={20} />}
                      {platform.id === 'linkedin' && <Linkedin size={20} />}
                      {platform.id === 'youtube' && <Youtube size={20} />}
                      {platform.id === 'github' && <Github size={20} />}
                      {platform.id === 'website' && <Globe size={20} />}
                      <span>{platform.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 space-y-4">
              {socialIcons.map((icon) => (
                <div
                  key={icon.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-gray-300 p-2 rounded-lg"
                >
                  <div className="relative text-black w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md bg-gray-50">
                    {icon.platform?.id === 'facebook' && <Facebook size={24} />}
                    {icon.platform?.id === 'twitter' && <Twitter size={24} />}
                    {icon.platform?.id === 'instagram' && <Instagram size={24} />}
                    {icon.platform?.id === 'linkedin' && <Linkedin size={24} />}
                    {icon.platform?.id === 'youtube' && <Youtube size={24} />}
                    {icon.platform?.id === 'github' && <Github size={24} />}
                    {icon.platform?.id === 'website' && <Globe size={24} />}
                    <button
                      type="button"
                      onClick={() => handleRemoveSocialIcon(icon.id)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white text-xs p-1 rounded-full hover:bg-red-700 w-5 h-5 flex items-center justify-center"
                      title="Remove"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">{icon.platform?.name || 'Link'}</p>
                    <input
                      type="url"
                      placeholder="https://your-link.com"
                      className="w-full border border-gray-400 p-2 rounded-md text-black"
                      value={icon.link}
                      onChange={(e) => handleLinkChange(icon.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Social Link Modal */}
            {showLinkModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg text-black font-medium">
                      Add {selectedSocialPlatform?.name} Link
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowLinkModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter your {selectedSocialPlatform?.name} profile URL
                    </label>
                    <input
                      type="url"
                      className="w-full text-black border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`https://${selectedSocialPlatform?.name.toLowerCase()}.com/your-profile`}
                      value={socialLink}
                      onChange={(e) => setSocialLink(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowLinkModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddSocialIcon}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-xl border border-gray-200 shadow-md p-4 text-white">
          <label className="text-black text-xl sm:text-2xl">
            Recent Post and Working Hours
          </label>

          <div className="mt-12 text-center">
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
                  className="flex flex-col sm:flex-row items-stretch gap-4 border border-gray-300 p-2 rounded-lg"
                >
                  <input
                    type="text"
                    placeholder="Enter Post Name"
                    className="w-full sm:w-1/2 border border-gray-400 p-2 rounded-md text-black"
                    value={post.name}
                    onChange={(e) =>
                      handleRecentPostChange(post.id, "name", e.target.value)
                    }
                  />
                  <input
                    type="url"
                    placeholder="https://link-to-post.com"
                    className="w-full sm:w-1/2 border border-gray-400 p-2 rounded-md text-black"
                    value={post.link}
                    onChange={(e) =>
                      handleRecentPostChange(post.id, "link", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRecentPost(post.id)}
                    className="self-start bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                    title="Remove post"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 text-center">
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
                  className="flex flex-col sm:flex-row items-stretch gap-4 border border-gray-300 p-2 rounded-lg"
                >
                  <input
                    type="text"
                    placeholder="Enter Day (e.g., Monday)"
                    className="w-full sm:w-1/2 border border-gray-400 p-2 rounded-md text-black"
                    value={item.day}
                    onChange={(e) =>
                      handleDayTimeChange(item.id, "day", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter Time (e.g., 10:00 AM - 5:00 PM)"
                    className="w-full sm:w-1/2 border border-gray-400 p-2 rounded-md text-black"
                    value={item.time}
                    onChange={(e) =>
                      handleDayTimeChange(item.id, "time", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDayTime(item.id)}
                    className="self-start bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                    title="Remove"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-25">
            <div className="w-full sm:w-1/2">
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <div className="w-full sm:w-1/2">
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-9 text-center">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button 
          type="submit" 
          disabled={loading}
          className={`bg-blue-600 text-white px-8 py-2 rounded-md text-lg hover:bg-blue-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Saving...' : isEditing ? 'Update' : 'Publish'}
        </button>
      </div>
      </form>
      
      {/* Footer Preview Section */}
      {footerData && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-4 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Your Footer Preview</h2>
            <div className="flex gap-2">
              <button 
                onClick={handleEditFooter}
                disabled={isEditing}
                className={`flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Edit size={16} /> Edit
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
                className={`flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
          
          {/* Preview container - responsive design */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="w-full flex flex-col md:flex-row flex-wrap gap-8 bg-gray-800 text-white p-6 rounded-lg">
              {/* Logo and company info */}
              <div className="w-full md:w-1/4">
                {footerData.logoUrl && (
                  <div className="mb-4">
                    <img src={footerData.logoUrl} alt="Logo" className="max-w-[180px] h-auto mb-4" />
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                  {footerData.address && (
                    <p className="mb-2 text-gray-300">
                      <span className="font-medium">Address:</span> {footerData.address}
                    </p>
                  )}
                  {footerData.phone && (
                    <p className="mb-2 text-gray-300">
                      <span className="font-medium">Phone:</span> {footerData.phone}
                    </p>
                  )}
                  {footerData.description && (
                    <p className="mb-2 text-gray-300">
                      <span className="font-medium">Description:</span> {footerData.description}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Recent Posts */}
              {footerData.recentPosts && footerData.recentPosts.length > 0 && (
                <div className="w-full md:w-1/4">
                  <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
                  <ul className="space-y-2">
                    {footerData.recentPosts.map((post) => (
                      <li key={post.id} className="hover:text-blue-300">
                        <a href={post.link} target="_blank" rel="noopener noreferrer" className="block py-1">
                          {post.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Working Hours */}
              {footerData.dayTimes && footerData.dayTimes.length > 0 && (
                <div className="w-full md:w-1/4">
                  <h3 className="text-xl font-semibold mb-4">Working Hours</h3>
                  <ul className="space-y-2">
                    {footerData.dayTimes.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span className="font-medium">{item.day}</span>
                        <span className="text-gray-300">{item.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Social Icons */}
              {footerData.socialIcons && footerData.socialIcons.length > 0 && (
                <div className="w-full md:w-1/4">
                  <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                  <div className="flex flex-wrap gap-3">
                    {footerData.socialIcons.map((icon) => (
                      <a 
                        key={icon.id} 
                        href={icon.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-blue-600 rounded-full transition-colors"
                      >
                        {icon.platform?.id === 'facebook' && <Facebook size={20} />}
                        {icon.platform?.id === 'twitter' && <Twitter size={20} />}
                        {icon.platform?.id === 'instagram' && <Instagram size={20} />}
                        {icon.platform?.id === 'linkedin' && <Linkedin size={20} />}
                        {icon.platform?.id === 'youtube' && <Youtube size={20} />}
                        {icon.platform?.id === 'github' && <Github size={20} />}
                        {icon.platform?.id === 'website' && <Globe size={20} />}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this footer? This action cannot be undone.</p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFooter}
                disabled={isDeleting}
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${isDeleting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
