import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Client from "./pages/Client";

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
        </div>
      </div>
    </Router>
  );
};

export default App;
