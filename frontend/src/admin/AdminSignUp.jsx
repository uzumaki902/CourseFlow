// ======================= IMPORTS =======================
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import axios from "axios";
import appLogo from "../assets/z.png";
import { BACKEND_URL } from "../utils/utils";

// ======================= COMPONENT =======================
const AdminSignUp = () => {
  // ================= STATE =================
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signupStatus, setSignupStatus] = useState("");

  const navigate = useNavigate();

  // ================= SUBMIT HANDLER =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSignupStatus("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/signup`,
        { firstName, lastName, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Signup successful", response.data);

      setSignupStatus("Account created successfully!");

      // ✅ OPTION 1: delay navigation so message renders
      setTimeout(() => {
        navigate("/admin/login");
      }, 1000);

    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        "Signup failed. Please try again."
      );
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
          <img src={appLogo} alt="CourseFlow" className="h-10" />

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link to="/login">Log In</Link>
            </Button>
            <Button
              asChild
              className="bg-linear-to-r from-purple-600 to-fuchsia-600 text-white rounded-full px-8 py-6"
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
          <div className="text-center mb-10">
            <img src={appLogo} alt="CourseFlow" className="h-14 mx-auto mb-4" />
          </div>

          <div className="bg-white/5 backdrop-blur-2xl border border-purple-800/40 rounded-2xl p-8 shadow-2xl">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Success Message */}
              {signupStatus && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-xl text-sm">
                  {signupStatus}
                </div>
              )}

              {/* First Name */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/50 rounded-xl text-white"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/50 rounded-xl text-white"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/50 rounded-xl text-white"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-800/50 rounded-xl text-white"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-linear-to-r from-purple-600 to-fuchsia-600 text-white font-semibold rounded-xl cursor-pointer hover:opacity-90 transitioncd"
              >
                Create Account
              </button>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSignUp;
