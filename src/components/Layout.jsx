import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <div className="flex h-screen bg-gray-50">
      {!isAuthPage && <Sidebar />}
      <div
        className={`flex flex-col ${
          !isAuthPage ? "flex-1" : "w-full"
        } overflow-hidden`}
      >
        {!isAuthPage && <Navbar />}
        <main
          className={`${
            !isAuthPage ? "flex-1 overflow-y-auto p-6" : "w-full h-full"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
