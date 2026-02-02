import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import  { Toaster } from 'react-hot-toast';
import Courses from "./pages/Courses";
import Buy from "./pages/Buy";
import Purchases from "./pages/Purchases";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/buy/:id" element={<Buy />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
