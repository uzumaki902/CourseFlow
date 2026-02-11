import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { Toaster } from "react-hot-toast";
import Courses from "./pages/Courses";
import Buy from "./pages/Buy";
import Purchases from "./pages/Purchases";
import AdminSignup from "./admin/AdminSignUp";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import CourseCreate from "./admin/CourseCreate";
import UpdateCourse from "./admin/UpdateCourse";
import OurCourses from "./admin/OurCourses";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <div>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/buy/:courseId" element={<Buy />} />

        <Route
          path="/purchases"
          element={user ? <Purchases /> : <Navigate to="/login" />}
        />

        {/* Admin Routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={admin ? <Dashboard /> : <Navigate to="/admin/login" />}
        />

        <Route
          path="/admin/create-course"
          element={admin ? <CourseCreate /> : <Navigate to="/admin/login" />}
        />

        <Route
          path="/admin/update-course/:id"
          element={admin ? <UpdateCourse /> : <Navigate to="/admin/login" />}
        />

        <Route
          path="/admin/our-courses"
          element={admin ? <OurCourses /> : <Navigate to="/admin/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
