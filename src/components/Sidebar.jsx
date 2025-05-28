import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: 'home' },
    { name: 'Task', path: '/task', icon: 'task_alt' },
    { name: 'Files/Folders', path: '/files', icon: 'folder' },
    { name: 'Media', path: '/media', icon: 'perm_media' },
    { name: 'Analytics', path: '/analytics', icon: 'analytics' },
    { name: 'Projects', path: '/projects', icon: 'work' },
    { name: 'Shop', path: '/shop', icon: 'shopping_bag' },
    { name: 'Clients', path: '/client', icon: 'people' },
    { name: 'Appointments', path: '/appointments', icon: 'event' },
    { name: 'Easter', path: '/easter', icon: 'egg' },
    { name: 'Sign In', path: '/signin', icon: 'login' }
  ];

  return (
    <div className="h-screen w-[240px] bg-white flex flex-col shadow-md fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-indigo-800">
          <span className="text-purple-900">LZY</span> CRAZY
        </h1>
      </div>
      
      {/* Menu Items */}
      <div className="flex-grow overflow-y-auto pt-4">
        <ul>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
                             (location.pathname === '/' && item.path === '/') ||
                             (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center py-3 px-6 text-sm ${
                    isActive 
                      ? 'bg-blue-500 text-white font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="material-symbols-outlined mr-4 text-xl">
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Upgrade to Pro */}
      <div className="p-4 m-4 mb-6 rounded-lg bg-gradient-to-b from-indigo-500 to-indigo-700 text-white text-center">
        <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-2">
          <span className="material-symbols-outlined text-indigo-600">bolt</span>
        </div>
        <h3 className="font-medium">Upgrade to PRO</h3>
        <p className="text-xs mt-1 opacity-80">Get 1 month free and unlock all PRO features</p>
      </div>
    </div>
  );
};

export default Sidebar;
