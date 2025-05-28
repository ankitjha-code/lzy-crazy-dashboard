import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Client from "./pages/Client";
import Products from "./components/Products";
import Blogs from "./components/Blogs";
import AboutUsForm from "./components/AboutUsForm";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#f3f6fd]">
       
        
        {/* Main content area */}
        <div className="flex-1">
          {/* Navbar is full width */}
          <Navbar />
          
          {/* Main content */}
          <main>
            <Routes>
              <Route path="/client" element={<Client />} />
              <Route path="/" element={<Client />} />
            </Routes>
        </main>
        <Register></Register>
        <Login></Login>
        <Products></Products>
        <Blogs></Blogs>
        <AboutUsForm></AboutUsForm>
        </div>
      </div>
    </Router>
  );
};

export default App;
