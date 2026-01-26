// ======================= IMPORTS =======================
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import appLogo from "../assets/z.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ======================= COMPONENT =======================
const Signup = () => {
  // ================= STATE =================
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // ================= SUBMIT HANDLER =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", { firstName, lastName, email, password }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
      console.log("Signup successful", response.data);
      alert("Signup successful!");
      navigate ("/login");

    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Signup failed. Please try again.");
      }

    }

  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* ================= NAVBAR ================= */}
      <motion.header
        className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-xl border-b border-purple-800/20"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={appLogo} alt="CourseFlow" className="h-10 w-auto" />
          </div>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-gray-400 hover:text-black">
              <Link to="/login">Log In</Link>
            </Button>

            <Button
              asChild
              className="bg-linear-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-full px-8 py-6"
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* ================= SIGNUP SECTION ================= */}
      <div className="flex items-center justify-center min-h-screen pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          {/* HEADER */}
          <div className="text-center mb-10">
            <img src={appLogo} alt="CourseFlow" className="h-14 mx-auto mb-4" />
          </div>

          {/* SIGNUP CARD */}
          <div className="bg-white/5 backdrop-blur-2xl border border-purple-800/40 rounded-2xl p-8 shadow-2xl shadow-purple-900/50">

            {/* ================= FORM START ================= */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-linear-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl shadow-2xl shadow-purple-900/60 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Create Account
              </button>

            </form>
            {/* ================= FORM END ================= */}

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
