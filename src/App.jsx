import React from "react";
import Products from "./components/Products";
import Blogs from "./components/Blogs";
import AboutUsForm from "./components/AboutUsForm";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">Welcome to My App</h1>
      <p className="mt-4 text-lg">
        This is a simple React app styled with Tailwind CSS.
        <Register></Register>
        <Login></Login>
        <Products></Products>
        <Blogs></Blogs>
        <AboutUsForm></AboutUsForm>
      </p>
    </div>
  );
};

export default App;
