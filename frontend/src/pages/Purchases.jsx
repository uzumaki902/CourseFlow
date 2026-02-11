import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, LogOut, BookOpen, BadgeIndianRupee, ShoppingBag, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your purchases");
      navigate("/login");
      return;
    }

    const fetchPurchases = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${BACKEND_URL}/user/purchases`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        console.log("Purchases response:", response.data);
        setPurchases(response.data.courseData || []);
        
      } catch (error) {
        console.error("Error fetching purchases:", error);
        
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          const errorMessage = 
            error?.response?.data?.errors ||
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch purchases";
          
          setError(errorMessage);
          toast.error(errorMessage);
        }
        
        setPurchases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="flex">
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

              <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-linear-to-r from-purple-600/30 to-fuchsia-600/30 border border-purple-600">
                <BadgeIndianRupee className="w-5 h-5 text-purple-300" />
                <span className="font-medium text-purple-200">Purchases</span>
              </div>

              <Link to="/courses" className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-purple-800/50 hover:bg-purple-900/40 hover:border-purple-600 transition-all group">
                <BookOpen className="w-5 h-5 text-purple-400 group-hover:scale-110 transition" />
                <span className="font-medium">All Courses</span>
              </Link>

              <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-purple-800/50 hover:bg-red-900/30 hover:border-red-600 transition-all group">
                <LogOut className="w-5 h-5 text-red-400 group-hover:scale-110 transition" />
                <span className="font-medium text-red-300">Logout</span>
              </button>
            </nav>
          </div>
        </motion.aside>

        <div className="ml-80 flex-1 p-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-5xl font-light mb-4">
              My <span className="font-medium bg-linear-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Purchases</span>
            </h1>
            <p className="text-gray-400 text-lg">Access all your purchased courses here</p>
            
            {!loading && purchases.length > 0 && (
              <div className="mt-4 inline-flex items-center gap-2 bg-purple-600/20 border border-purple-600/50 rounded-full px-4 py-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">
                  {purchases.length} {purchases.length === 1 ? "Course" : "Courses"} Purchased
                </span>
              </div>
            )}
          </motion.div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-xl mt-6">Loading your purchases...</p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="bg-red-900/20 border border-red-800/30 rounded-2xl p-12">
                  <AlertCircle className="w-20 h-20 text-red-400/50 mx-auto mb-6" />
                  <h3 className="text-2xl font-light text-gray-300 mb-3">Oops! Something went wrong</h3>
                  <p className="text-gray-500 mb-6">{error}</p>
                  <Button onClick={() => window.location.reload()} className="bg-linear-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl px-8 py-3">
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && purchases.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-900/50 border border-purple-800/30 rounded-2xl p-12">
                  <ShoppingBag className="w-20 h-20 text-purple-400/50 mx-auto mb-6" />
                  <h3 className="text-2xl font-light text-gray-300 mb-3">No purchases yet</h3>
                  <p className="text-gray-500 mb-6">Start learning by purchasing your first course!</p>
                  <Link to="/courses">
                    <Button className="bg-linear-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl px-8 py-3">
                      Browse Courses
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Purchases Grid - NO VIEW BUTTON */}
          {!loading && !error && purchases.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchases.map((course) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-xl border border-purple-800/40 rounded-2xl overflow-hidden shadow-2xl hover:border-purple-600/70 transition-all duration-300">
                    <div className="h-48 relative">
                      <img
                        src={course.image?.url || "https://via.placeholder.com/400x200/1a0033/ffffff?text=No+Image"}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                      
                      <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        ✓ PURCHASED
                      </div>
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

                        {/* ✅ REMOVED: View Course Button */}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchases;