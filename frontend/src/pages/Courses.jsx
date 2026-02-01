import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, Home, LogOut, BookOpen,BadgeIndianRupee } from "lucide-react";
import appLogo from "../assets/z.png";

const Courses = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="flex">
        {/* ==================== LEFT SIDEBAR (1/4) ==================== */}
        <motion.aside
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-80 bg-gradient-to-b from-purple-900/20 to-black border-r border-purple-800/40 min-h-screen fixed left-0 top-0 z-40 backdrop-blur-xl"
        >
          <div className="p-8">
            {/* Logo */}
           

            {/* Navigation Menu */}
            <nav className="space-y-4">
              <Link
                to="/"
                className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-purple-800/50 hover:bg-purple-900/40 hover:border-purple-600 transition-all group"
              >
                <Home className="w-5 h-5 text-purple-400 group-hover:scale-110 transition" />
                <span className="font-medium">Home</span>
              </Link>
              <Link
                to="/purchases"
                className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-purple-800/50 hover:bg-purple-900/40 hover:border-purple-600 transition-all group"
              >
                <BadgeIndianRupee className="w-5 h-5 text-purple-400 group-hover:scale-110 transition" />
                <span className="font-medium">Purchases</span>
              </Link>

              <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 border border-purple-600">
                <BookOpen className="w-5 h-5 text-purple-300" />
                <span className="font-medium text-purple-200">All Courses</span>
              </div>

              <Link
                to="/logout"
                className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-purple-800/50 hover:bg-red-900/30 hover:border-red-600 transition-all group"
              >
                <LogOut className="w-5 h-5 text-red-400 group-hover:scale-110 transition" />
                <span className="font-medium text-red-300">Logout</span>
              </Link>
            </nav>
          </div>
        </motion.aside>

        {/* ==================== MAIN CONTENT (3/4) ==================== */}
        <div className="ml-80 flex-1 p-10">
          {/* Header with Search */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-light mb-6">
              All <span className="font-medium bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Courses</span>
            </h1>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-16 pr-6 py-5 bg-white/10 border border-purple-800/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all text-lg"
              />
            </div>
          </motion.div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Card 1 */}
            <motion.div
              whileHover={{ y: -12 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-purple-800/40 rounded-2xl overflow-hidden shadow-2xl hover:border-purple-600/70 transition-all">
                <div className="h-48 bg-gradient-to-br from-purple-600/30 to-fuchsia-600/30 relative">
                  <img
                    src="https://via.placeholder.com/400x200/6b21d9/000000?text=React+Mastery"
                    alt="Course"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold group-hover:text-purple-300 transition">
                    React Masterclass 2025
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    Master React 18 with hooks, context, redux, and real-world projects
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                      $149
                    </span>
                    <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl px-8">
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Repeat this block for more courses */}
            {[...Array(8)].map((_, i) => (
              <motion.div key={i} whileHover={{ y: -12 }}>
                <div className="bg-white/5 backdrop-blur-xl border border-purple-800/40 rounded-2xl overflow-hidden shadow-2xl hover:border-purple-600/70 transition-all">
                  <div className="h-48 bg-gray-800 relative">
                    <img
                      src={`https://via.placeholder.com/400x200/1a0033/ffffff?text=Course+${i + 2}`}
                      alt="Course"
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold group-hover:text-purple-300 transition">
                      Premium Course Title {i + 2}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      Learn advanced concepts with hands-on projects and expert guidance
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                        ${Math.floor(Math.random() * 100) + 49}
                      </span>
                      <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl px-8">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;