import React, { useEffect } from "react";
import { Link } from "react-router";
import { HiHome, HiSearch } from "react-icons/hi";
import { FaCar } from "react-icons/fa";

const Error404 = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found | RentWheels";
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-base-100 rounded-2xl shadow-2xl p-8 md:p-12 border border-base-300">
          {/* Animated Car Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <FaCar className="text-secondary text-8xl md:text-9xl animate-bounce" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-neutral/20 rounded-full blur-sm"></div>
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-7xl md:text-9xl font-heading font-bold text-primary mb-4">
            404
          </h1>

          {/* Error Message */}
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-neutral mb-3">
            Oops! Road Not Found
          </h2>
          <p className="text-base md:text-lg text-neutral-medium font-body mb-8 max-w-md mx-auto">
            Looks like this route doesn't exist in our system. The car you're
            looking for might have taken a different turn!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="btn btn-primary btn-lg rounded-full px-8 text-white font-body font-medium border-0 hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <HiHome className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              to="/browse"
              className="btn btn-lg rounded-full px-8 font-body font-medium border-0 bg-accent text-white hover:bg-accent/90 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <HiSearch className="w-5 h-5" />
              Browse Cars
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-10 pt-8 border-t border-base-300">
            <p className="text-sm text-neutral-medium font-body">
              Need help?{" "}
              <Link
                to="/"
                className="text-primary hover:text-primary-dark font-semibold hover:underline transition-colors duration-200"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-3 opacity-30">
          <FaCar className="text-primary text-2xl" />
          <FaCar className="text-secondary text-2xl" />
          <FaCar className="text-accent text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Error404;
