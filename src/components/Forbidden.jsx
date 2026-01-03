import React, { useEffect } from "react";
import { Link } from "react-router";
import { HiHome, HiLockClosed } from "react-icons/hi";
import { FaShieldAlt } from "react-icons/fa";

const Forbidden = () => {
  useEffect(() => {
    document.title = "403 - Access Forbidden | RentWheels";
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-base-100 rounded-2xl shadow-2xl p-8 md:p-12 border border-base-300">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <FaShieldAlt className="text-error text-8xl md:text-9xl animate-pulse" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-neutral/20 rounded-full blur-sm"></div>
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-heading font-bold text-error mb-4">
            403
          </h1>

          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-neutral mb-3">
            Access Denied
          </h2>
          <p className="text-base md:text-lg text-neutral-medium font-body mb-8 max-w-md mx-auto">
            You don't have permission to access this page. This area is
            restricted to administrators only.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="btn btn-primary btn-lg rounded-full px-8 text-white font-body font-medium border-0 hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <HiHome className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              to="/dashboard"
              className="btn btn-lg rounded-full px-8 font-body font-medium border-0 bg-secondary text-white hover:bg-secondary/90 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <HiLockClosed className="w-5 h-5" />
              My Dashboard
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-base-300">
            <p className="text-sm text-neutral-medium font-body">
              Need admin access?{" "}
              <Link
                to="/"
                className="text-primary hover:text-primary-dark font-semibold hover:underline transition-colors duration-200"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3 opacity-30">
          <HiLockClosed className="text-error text-2xl" />
          <FaShieldAlt className="text-error text-2xl" />
          <HiLockClosed className="text-error text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
