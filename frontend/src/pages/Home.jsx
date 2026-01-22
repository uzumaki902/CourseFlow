import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// shadcn components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { motion as Motion } from "framer-motion";

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
  const skillLogos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
  ];

  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ===================== NAVBAR ===================== */}
      <header className="sticky top-0 z-50 w-full border-b bg-fuchsia-950 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* LEFT: Logo */}
          <div className="flex items-center gap-3">
            <img
              src={appLogo}
              alt="CourseFlow"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* CENTER: Skill logos carousel */}
        

          {/* RIGHT: Buttons */}
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="bg-black text-amber-50">
              <Link to="/login">Login</Link>
            </Button>

            <Button asChild className="rounded-xl hover:bg-amber-50 hover:text-black">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <main >
        <section className="container mx-auto px-4 py-14 md:py-20 bg-purple-800 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Learn faster with courses
                <span className="block text-muted">
                  built for real results.
                </span>
              </h1>

              <p className="text-lg max-w-xl">
                CourseFlow is a modern learning platform where students can
                browse, buy, and learn from premium courses — with secure login,
                purchase tracking, and access to only the courses they own.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-xl">
                  <Link to="/courses">Explore Courses</Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="rounded-xl">
                  <Link to="/signup">Course Videos</Link>
                </Button>
              </div>
            </div>

            {/* Right */}
            <div className="relative w-full max-w-md mx-auto">
              {/* glow background */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
                <div className="h-72 w-72 rounded-full bg-primary/40 absolute top-6 left-10" />
                <div className="h-72 w-72 rounded-full bg-purple-500/30 absolute bottom-0 right-0" />
              </div>

              {/* animated illustration */}
              <Motion.img
                src={studySvg}
                alt="Student studying"
                className="w-full h-auto"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </section>

        {/* ===================== FEATURES ===================== */}
        {/* ===================== SKILLS CAROUSEL SECTION ===================== */}
<section className="border-t bg-muted/20">
  <div className="container mx-auto px-4 py-14 bg bg-black">
    

    <div className="max-w-4xl mx-auto ">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {skillLogos.map((src, idx) => (
            <CarouselItem
              key={idx}
              className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/5"
            >
              <div className="h-20 rounded-2xl border bg-background/60 shadow-sm flex items-center justify-center">
                <img
                  src={src}
                  alt={`skill-${idx}`}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  </div>
</section>

      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 ">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CourseFlow. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm">
            <Link className="hover:opacity-80" to="/privacy">
              Privacy
            </Link>
            <Link className="hover:opacity-80" to="/terms">
              Terms
            </Link>
            <Link className="hover:opacity-80" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
