import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Home, LogOut, BookOpen, BadgeIndianRupee } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";



const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <motion.aside
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-80 bg-linear-to-b from-purple-900/20 to-black border-r border-purple-800/40 min-h-screen fixed left-0 top-0 z-40 backdrop-blur-xl"
        >
          <div className="p-8">
           

            <nav className="space-y-4">
              <Link to="/" className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-purple-800/50 hover:bg-purple-900/40 hover:border-purple-600 transition-all group">
                <Home className="w-5 h-5 text-purple-400 group-hover:scale-110 transition" />
                <span className="font-medium">Home</span>
              </Link>

              <Link to="/purchases" className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-purple-800/50 hover:bg-purple-900/40 hover:border-purple-600 transition-all group">
                <BadgeIndianRupee className="w-5 h-5 text-purple-400 group-hover:scale-110 transition" />
                <span className="font-medium">Purchases</span>
              </Link>

              <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-linear-to-r from-purple-600/30 to-fuchsia-600/30 border border-purple-600">
                <BookOpen className="w-5 h-5 text-purple-300" />
                <span className="font-medium text-purple-200">All Courses</span>
              </div>

              <Link to="/logout" className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-purple-800/50 hover:bg-red-900/30 hover:border-red-600 transition-all group">
                <LogOut className="w-5 h-5 text-red-400 group-hover:scale-110 transition" />
                <span className="font-medium text-red-300">Logout</span>
              </Link>
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="ml-80 flex-1 p-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-5xl font-light mb-6">
              All <span className="font-medium bg-linear-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Courses</span>
            </h1>

            <div className="relative max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-16 pr-6 py-5 bg-white/10 border border-purple-800/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all text-lg"
              />
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-xl mt-6">Loading courses...</p>
              </div>
            </div>
          )}

          {/* No Courses */}
          {!loading && courses.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-900/50 border border-purple-800/30 rounded-2xl p-12">
                  <BookOpen className="w-20 h-20 text-purple-400/50 mx-auto mb-6" />
                  <h3 className="text-2xl font-light text-gray-300 mb-3">
                    No courses posted by admin yet
                  </h3>
                  <p className="text-gray-500">
                    New courses will appear here once published...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Courses Grid */}
          {!loading && courses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group"
                >
                  {/* Card Click → Course Details */}
                  <Link to={`/course/${course._id}`} className="block">
                    <div className="bg-white/5 backdrop-blur-xl border border-purple-800/40 rounded-2xl overflow-hidden shadow-2xl hover:border-purple-600/70 transition-all duration-300">
                      <div className="h-48 relative">
                        <img
                          src={course.image?.url || "https://via.placeholder.com/400x200/1a0033/ffffff?text=No+Image"}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                      </div>
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-semibold group-hover:text-purple-300 transition">
                          {course.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-purple-800/30">
                          <span className="text-3xl font-bold bg-linear-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                            ${course.price}
                          </span>

                          {/* Buy Now Button → Goes to Buy Page */}
                          <Link to={`/buy/${course._id}`} onClick={(e) => e.stopPropagation()}>
                            <Button className="bg-linear-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl px-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                              Buy Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;