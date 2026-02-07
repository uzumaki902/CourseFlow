import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, LogOut, BookOpen, BadgeIndianRupee, ShoppingBag, Clock } from "lucide-react";


const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        // TODO: Add your API call here
        // const response = await axios.get("http://localhost:3000/api/v1/course/purchases", {
        //   headers: { Authorization: `Bearer ${token}` },
        //   withCredentials: true,
        // });
        // setPurchases(response.data.purchases || []);
        
        // Temporary mock data - remove this when you add real API
        setTimeout(() => {
          setPurchases([]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching purchases:", error);
        setPurchases([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Orbs - Same as Courses */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="flex">
        {/* Left Sidebar - EXACTLY SAME AS COURSES */}
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

              {/* Purchases - NOW ACTIVE/HIGHLIGHTED */}
              <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-linear-to-r from-purple-600/30 to-fuchsia-600/30 border border-purple-600">
                <BadgeIndianRupee className="w-5 h-5 text-purple-300" />
                <span className="font-medium text-purple-200">Purchases</span>
              </div>

              <Link to="/courses" className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-purple-800/50 hover:bg-purple-900/40 hover:border-purple-600 transition-all group">
                <BookOpen className="w-5 h-5 text-purple-400 group-hover:scale-110 transition" />
                <span className="font-medium">All Courses</span>
              </Link>

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
              My <span className="font-medium bg-linear-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Purchases</span>
            </h1>
            
            <p className="text-gray-400 text-lg">
              Access all your purchased courses here
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-xl mt-6">Loading your purchases...</p>
              </div>
            </div>
          )}

          {/* No Purchases */}
          {!loading && purchases.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-900/50 border border-purple-800/30 rounded-2xl p-12">
                  <ShoppingBag className="w-20 h-20 text-purple-400/50 mx-auto mb-6" />
                  <h3 className="text-2xl font-light text-gray-300 mb-3">
                    No purchases yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start learning by purchasing your first course!
                  </p>
                  <Link to="/courses">
                    <Button className="bg-linear-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                      Browse Courses
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Purchases Grid */}
          {!loading && purchases.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchases.map((purchase) => (
                <motion.div
                  key={purchase._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group"
                >
                  <Link to={`/course/${purchase.courseId?._id || purchase._id}`} className="block">
                    <div className="bg-white/5 backdrop-blur-xl border border-purple-800/40 rounded-2xl overflow-hidden shadow-2xl hover:border-purple-600/70 transition-all duration-300">
                      {/* Course Image */}
                      <div className="h-48 relative">
                        <img
                          src={purchase.courseId?.image?.url || "https://via.placeholder.com/400x200/1a0033/ffffff?text=Course"}
                          alt={purchase.courseId?.title || "Course"}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                        
                        {/* Purchased Badge */}
                        <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                          PURCHASED
                        </div>
                      </div>

                      {/* Course Details */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-semibold group-hover:text-purple-300 transition">
                          {purchase.courseId?.title || "Course Title"}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {purchase.courseId?.description || "Course description"}
                        </p>

                        {/* Purchase Info */}
                        <div className="flex items-center justify-between pt-4 border-t border-purple-800/30">
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>
                              {purchase.purchasedAt 
                                ? new Date(purchase.purchasedAt).toLocaleDateString()
                                : "Recently purchased"}
                            </span>
                          </div>
                          
                          {/* View Course Button */}
                          <Button className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl px-6 py-2 text-sm shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                            View Course
                          </Button>
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

export default Purchases;