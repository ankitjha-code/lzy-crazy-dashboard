import React from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Hero_Section from "./components/Hero_Section/Hero_Section";
import Slider from "./components/Slider/Slider";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="/hero-section" element={<Hero_Section />} />
        <Route path="/slider" element={<Slider />} />
      </Routes>
    </>
  );
};

export default App;
