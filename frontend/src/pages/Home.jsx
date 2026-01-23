import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import studySvg from "../assets/study.svg";
import appLogo from "../assets/z.png";
import logo1 from "../assets/adobe.svg";
import logo2 from "../assets/amazon.svg";
import logo3 from "../assets/cpp.svg";
import logo4 from "../assets/docker.svg";
import logo5 from "../assets/js.svg";
import logo6 from "../assets/npm.svg";
import logo7 from "../assets/php.svg";
import logo8 from "../assets/python.svg";
import logo9 from "../assets/react.svg";

const Home = () => {
  const [api, setApi] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (api) {
      const interval = setInterval(() => api.scrollNext(), 2500);
      return () => clearInterval(interval);
    }
  }, [api]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Floating Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-900/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <motion.header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-2xl border-b border-purple-800/20"
            : "bg-transparent"
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
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wide relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-fuchsia-500 group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white border-0 rounded-full px-8 py-6 shadow-2xl shadow-purple-900/50"
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light leading-tight">
                <span className="block">Learn</span>
                <span className="block font-medium bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                  Without Limits
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                Master in-demand skills from world-class instructors. 
                Lifetime access. Real projects. Certificates that matter.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-full px-10 py-7 text-lg shadow-2xl shadow-purple-900/50"
              >
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg border-purple-600/30 text-gray-300 hover:bg-purple-900/20">
                <Link to="/demo">Watch Preview</Link>
              </Button>
            </div>

            <div className="flex items-center gap-12 pt-8">
              <div>
                <p className="text-4xl font-light">
                  <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">50,000+</span>
                </p>
                <p className="text-sm text-gray-500">Active Students</p>
              </div>
              <div>
                <p className="text-4xl font-light">
                  <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">4.9</span> ★
                </p>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative flex justify-center"
          >
            <motion.img
              src={studySvg}
              alt="Premium learning experience"
              className="w-full max-w-2xl drop-shadow-2xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-24 border-t border-purple-900/30 bg-gradient-to-b from-black to-purple-950/10">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-12">
            Trusted by developers at
          </p>
          <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {logos.map((logo, i) => (
                <CarouselItem key={i} className="pl-4 basis-1/4 md:basis-1/6">
                  <div className="flex items-center justify-center h-20">
                    <img src={logo} alt="" className="h-10 opacity-40 hover:opacity-80 transition-all duration-500" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Features */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-light mb-6">
              Built for <span className="font-medium bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">serious learners</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { title: "Lifetime Access", desc: "Own your courses forever. No subscriptions. No monthly fees." },
              { title: "Expert Instructors", desc: "Learn from practitioners who work at FAANG and top startups." },
              { title: "Real Certificates", desc: "Blockchain-verified certificates recognized by top employers." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-800/30 hover:border-purple-600/50 transition-all duration-500 h-full p-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 opacity-20 group-hover:opacity-40 transition-all duration-500" />
                  <h3 className="text-2xl font-light mb-4">{f.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl lg:text-7xl font-light mb-8">
              Start your journey
              <span className="block font-medium bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">today</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of developers who chose premium education over endless free tutorials.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-full px-12 py-8 text-xl shadow-2xl shadow-purple-900/50"
              >
                <Link to="/signup">Begin Learning</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/30 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CourseFlow. Crafted with precision.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;