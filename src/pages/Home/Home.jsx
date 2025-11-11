import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold font-heading text-neutral">
          Welcome to <span className="text-primary">RentWheels</span>
        </h1>
        <p className="text-base md:text-lg font-body text-neutral-medium mt-4">
          Your premium car rental platform
        </p>
      </div>
    </div>
  );
};

export default Home;
