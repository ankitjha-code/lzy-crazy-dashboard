import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Mobile Sidebar Menu - slides from left */}
      <div 
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 sm:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:hidden`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg text-gray-800">Menu</h2>
            <button 
              className="text-gray-500 focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="py-4 px-4">
          <div className="mb-4">
            <p className="text-gray-500 text-sm mb-2">Search</p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                type="text" 
                className="py-2 pl-10 pr-4 text-sm bg-[#f3f6fd] border-0 rounded-lg w-full placeholder-gray-400 focus:outline-none" 
                placeholder="Search" 
              />
            </div>
          </div>
          
          <ul className="space-y-2">
            <li>
              <button className="flex items-center p-2 w-full text-left rounded-lg hover:bg-gray-100 text-gray-700">
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                <span>Notifications</span>
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 w-full text-left rounded-lg hover:bg-gray-100 text-gray-700">
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
                <span>Dark Mode</span>
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 w-full text-left rounded-lg hover:bg-gray-100 text-gray-700">
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Information</span>
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 w-full text-left rounded-lg hover:bg-gray-100 text-gray-700">
                <div className="w-5 h-5 mr-3 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-blue-50/70 py-3 px-3 sm:px-4 md:px-6">
        {/* Top section with breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-green-600 font-medium">Pages</span>
          <span className="mx-1">/</span>
          <span>Home</span>
        </div>
        
        {/* Bottom section with title and actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1 gap-3 sm:gap-0">
          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Home</h1>
          
          {/* Mobile menu button - only visible on smallest screens */}
          <button 
            className="sm:hidden absolute top-4 right-4 text-gray-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Right side with search and actions - only visible on desktop */}
          <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm flex-shrink-0">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                type="text" 
                className="py-2 pl-10 pr-4 text-sm bg-[#f4f7fe] border-0 rounded-full w-24 xs:w-32 sm:w-36 md:w-44 lg:w-56 placeholder-gray-400 focus:outline-none" 
                placeholder="Search" 
              />
            </div>
            
            {/* Action items container */}
            <div className="flex items-center">
              {/* Notification Bell */}
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none mx-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </button>
              
              {/* Theme Toggle - Moon Icon */}
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none mx-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              </button>
              
              {/* Info Icon */}
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none mx-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
              
              {/* Profile Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden ml-1">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
