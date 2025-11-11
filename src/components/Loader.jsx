import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative">

          {/* Logo spinning animation */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <img
                src="/logo.png"
                alt="RentWheels Logo"
                className="w-24 h-24 object-contain animate-spin-smooth drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-3">
          <h3 className="text-2xl font-heading font-bold text-neutral">
            Loading<span className="animate-pulse">...</span>
          </h3>
          <p className="text-base text-neutral-medium font-body">
            Please wait while we get things ready
          </p>
        </div>

        {/* Spinner dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce-delay-0"></div>
          <div className="w-3 h-3 bg-secondary rounded-full animate-bounce-delay-150"></div>
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce-delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
