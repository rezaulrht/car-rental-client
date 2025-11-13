import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Find Your Perfect Ride",
      subtitle: "Anytime, Anywhere.",
      description:
        "Explore our wide selection of premium vehicles for your next adventure",
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600",
      buttonText: "Browse Cars",
    },
    {
      id: 2,
      title: "Luxury Meets Affordability",
      subtitle: "Drive Your Dreams.",
      description: "Experience top-tier vehicles at competitive rates",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600",
      buttonText: "View Offers",
    },
    {
      id: 3,
      title: "Book in Minutes",
      subtitle: "Drive in Hours.",
      description: "Fast, easy booking process with instant confirmation",
      image:
        "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1600",
      buttonText: "Get Started",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // Increased to 8 seconds to allow typewriter to complete
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-neutral">
      <div className="absolute inset-0 bg-linear-to-br from-neutral via-neutral-focus to-black"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>
          </motion.div>

          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="max-w-2xl text-white">
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-heading font-bold mb-4 min-h-[120px] md:min-h-40"
              >
                <Typewriter
                  words={[slides[currentSlide].title]}
                  loop={false}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={100}
                  delaySpeed={2000}
                />
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl md:text-5xl font-heading font-semibold text-primary mb-6"
              >
                {slides[currentSlide].subtitle}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg md:text-xl font-body mb-8 text-gray-200"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/browse">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary btn-lg text-white border-0 px-8"
                  >
                    {slides[currentSlide].buttonText}
                  </motion.button>
                </Link>
                <Link to="/learn-more">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary px-8"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-10"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-10"
      >
        <FaChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-primary w-12"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
