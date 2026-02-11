import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BookPlus,
  BookOpen,
  LogOut,
  Menu,
  X,
  Users,
  TrendingUp,
  DollarSign,
  LayoutDashboard,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { BACKEND_URL } from "../utils/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentCourses: [],
  });
  const [loading, setLoading] = useState(true);

  // Get admin info
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");
  const adminName = admin?.admin?.firstName || "Admin";

  // Check if admin is logged in
  useEffect(() => {
    if (!admin?.token) {
      navigate("/admin/login");
    }
  }, [admin?.token, navigate]);

  // Fetch dashboard stats
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all courses
      const response = await axios.get(
        `${BACKEND_URL}/course/courses`
      );
      
      const courses = response.data.courses || [];
      
      setStats({
        totalCourses: courses.length,
        totalUsers: Math.floor(Math.random() * 500) + 100, // Mock data
        totalRevenue: courses.reduce((acc, course) => acc + (course.price || 0), 0),
        recentCourses: courses.slice(0, 5),
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  // Sidebar navigation items
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
      active: true,
    },
    {
      title: "Create Course",
      icon: BookPlus,
      path: "/admin/create-course",
      active: false,
    },
    {
      title: "All Courses",
      icon: BookOpen,
      path: "/admin/our-courses",
      active: false,
    },
    {
      title: "Home",
      icon: Home,
      path: "/",
      active: false,
    },
  ];

  // Stats cards data
  const statsCards = [
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "from-purple-600 to-purple-400",
      bgColor: "bg-purple-600/20",
      iconColor: "text-purple-400",
    },
    {
      title: "Total Students",
      value: stats.totalUsers,
      icon: Users,
      color: "from-blue-600 to-blue-400",
      bgColor: "bg-blue-600/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue}`,
      icon: DollarSign,
      color: "from-green-600 to-green-400",
      bgColor: "bg-green-600/20",
      iconColor: "text-green-400",
    },
    {
      title: "Growth",
      value: "+23%",
      icon: TrendingUp,
      color: "from-orange-600 to-orange-400",
      bgColor: "bg-orange-600/20",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`${
                sidebarOpen ? "fixed" : "lg:fixed"
              } left-0 top-0 h-screen w-80 bg-linear-to-b from-gray-900 to-black border-r border-gray-800 backdrop-blur-xl z-40`}
            >
              <div className="p-8">
                {/* Logo/Title */}
                <div className="mb-10">
                  <h2 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Admin Panel
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">
                    Welcome back, {adminName}!
                  </p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all group ${
                        location.pathname === item.path
                          ? "bg-linear-to-r from-purple-600/30 to-blue-600/30 border border-purple-600"
                          : "hover:bg-white/5 border border-transparent hover:border-gray-700"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${
                          location.pathname === item.path
                            ? "text-purple-400"
                            : "text-gray-400 group-hover:text-white"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          location.pathname === item.path
                            ? "text-white"
                            : "text-gray-400 group-hover:text-white"
                        }`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  ))}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-xl hover:bg-red-900/20 border border-transparent hover:border-red-800 transition-all group"
                  >
                    <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                    <span className="font-medium text-red-400 group-hover:text-red-300">
                      Logout
                    </span>
                  </button>
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className={`flex-1 ${window.innerWidth >= 1024 ? "ml-80" : ""}`}>
          <div className="p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <h1 className="text-5xl font-light mb-2">
                Admin <span className="font-bold">Dashboard</span>
              </h1>
              <p className="text-gray-400">
                Manage your courses and monitor platform statistics
              </p>
            </motion.div>

            {/* Stats Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block">
                  <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-400 mt-4">Loading dashboard...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  {statsCards.map((card, index) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 ${card.bgColor} rounded-lg`}>
                          <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                        </div>
                        <span className="text-xs text-gray-500">This month</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-1">{card.value}</h3>
                      <p className="text-gray-400 text-sm">{card.title}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Courses */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Recent Courses</h2>
                    <Link
                      to="/admin/our-courses"
                      className="text-purple-400 hover:text-purple-300 transition"
                    >
                      View all →
                    </Link>
                  </div>

                  {stats.recentCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No courses created yet</p>
                      <Link
                        to="/admin/create-course"
                        className="inline-block mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition"
                      >
                        Create First Course
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {stats.recentCourses.map((course) => (
                        <div
                          key={course._id}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition"
                        >
                          <div className="flex items-center gap-4">
                            {course.image?.url ? (
                              <img
                                src={course.image.url}
                                alt={course.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-purple-400" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold">{course.title}</h3>
                              <p className="text-sm text-gray-400">
                                ${course.price}
                              </p>
                            </div>
                          </div>
                          <Link
                            to={`/admin/update-course/${course._id}`}
                            className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg text-purple-400 transition"
                          >
                           Update
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
                >
                  <Link
                    to="/admin/create-course"
                    className="p-6 bg-linear-0-to-r from-purple-600/20 to-blue-600/20 border border-purple-600/50 rounded-2xl hover:border-purple-400 transition group"
                  >
                    <BookPlus className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition" />
                    <h3 className="text-xl font-semibold mb-2">Create Course</h3>
                    <p className="text-sm text-gray-400">
                      Add a new course to the platform
                    </p>
                  </Link>

                  <Link
                    to="/admin/our-courses"
                    className="p-6 bg-linear-0-to-r from-blue-600/20 to-cyan-600/20 border border-blue-600/50 rounded-2xl hover:border-blue-400 transition group"
                  >
                    <BookOpen className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition" />
                    <h3 className="text-xl font-semibold mb-2">View Courses</h3>
                    <p className="text-sm text-gray-400">
                      Manage all platform courses
                    </p>
                  </Link>

                  <Link
                    to="/"
                    className="p-6 bg-linear-0-to-r from-green-600/20 to-emerald-600/20 border border-green-600/50 rounded-2xl hover:border-green-400 transition group"
                  >
                    <Home className="w-10 h-10 text-green-400 mb-4 group-hover:scale-110 transition" />
                    <h3 className="text-xl font-semibold mb-2">Visit Home</h3>
                    <p className="text-sm text-gray-400">
                      Go to the main website
                    </p>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
