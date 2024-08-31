import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login/Login";

const App = () => {
  const location = useLocation();
  return (
    <div className="font-geist">
      <Header />
      <div
        className={`pt-[71.98px] ${
          location.pathname !== "/" &&
          "max-w-device w-full h-full justify-self-center"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
