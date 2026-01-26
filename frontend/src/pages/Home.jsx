import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import axios from "axios";
import studySvg from "../assets/study.svg";
import appLogo from "../assets/z.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [courses, setCourses] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/course/courses", {
          withCredentials: true,
        });
        console.log("Courses:", response.data.courses);
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error:", error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-900/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-xl border-b border-purple-800/20" : "bg-transparent"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
            <img src={appLogo} alt="CourseFlow" className="h-10 w-auto" />
            <span className="text-2xl font-light tracking-wider bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              CourseFlow
            </span>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-12">
            {["Courses", "Pricing", "About", "Blog"].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-all text-sm tracking-wide relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-fuchsia-500 group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-full px-8 py-6 shadow-2xl shadow-purple-900/50">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light leading-tight">
                <span className="block">Learn</span>
                <span className="block font-medium bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                  Without Limits
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                Master in-demand skills from world-class instructors. Lifetime access. Real projects. Certificates that matter.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-full px-10 py-7 text-lg shadow-2xl shadow-purple-900/50">
                <Link to="/courses">Explore Courses</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center">
            <motion.img
              src={studySvg}
              alt="Learning"
              className="w-full max-w-2xl drop-shadow-2xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Clean Course Slider with Left/Right Buttons */}
      <section className="py-24 bg-gradient-to-b from-black via-purple-950/10 to-black border-t border-purple-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light mb-4">
              Available <span className="font-medium bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Courses</span>
            </h2>
            <p className="text-gray-400 text-lg">Choose your learning path</p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-purple-800/50 flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-purple-400" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-purple-800/50 flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-purple-400" />
            </button>

            {/* Course Cards */}
            <div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 px-2 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {courses.length > 0 ? (
                courses.map((course) => (
                  <motion.div
                    key={course._id}
                    className="snap-center shrink-0 w-80"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link to={`/course/${course._id}`} className="block group">
                      <div className="rounded-2xl overflow-hidden bg-gray-900/50 border border-purple-800/30 backdrop-blur-sm shadow-xl transition-all duration-300 hover:border-purple-600/70 hover:shadow-purple-600/30">
                        {/* Image */}
                        <div className="relative h-48 bg-gray-800">
                          <img
                            src={course.image?.url || "https://via.placeholder.com/400x200"}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                          <h3 className="text-xl font-semibold text-white line-clamp-2 group-hover:text-purple-400 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-3">
                            {course.description}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-purple-800/30">
                            <span className="text-2xl font-bold text-purple-400">
                              ${course.price}
                            </span>
                            <span className="text-sm text-gray-500">View Details →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                // Loading
                [...Array(5)].map((_, i) => (
                  <div key={i} className="shrink-0 w-80">
                    <div className="h-96 rounded-2xl bg-gray-900/30 border border-purple-800/20 animate-pulse" />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="text-center mt-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-full px-10 py-7 text-lg shadow-2xl shadow-purple-900/50">
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rest of your sections */}
      <section className="py-32 text-center">
        <h2 className="text-5xl lg:text-6xl font-light mb-20">
          Built for <span className="font-medium bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">serious learners</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
          {["Lifetime Access", "Expert Instructors", "Real Certificates"].map((title, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
              <div className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-800/30 p-10 rounded-2xl hover:border-purple-600/50 transition-all">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 opacity-20" />
                <h3 className="text-2xl font-light mb-4">{title}</h3>
                <p className="text-gray-400">Premium quality education without limits !.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-32 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="text-5xl lg:text-7xl font-light mb-8">
            Start your journey <span className="block font-medium bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">today</span>
          </h2>
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-full px-12 py-8 text-xl shadow-2xl shadow-purple-900/50">
            <Link to="/signup">Begin Learning</Link>
          </Button>
        </motion.div>
      </section>

      <footer className="border-t border-purple-900/30 py-16 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CourseFlow. Crafted with precision.
      </footer>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Home;