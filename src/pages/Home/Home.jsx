import React, { useEffect } from "react";
import HeroBanner from "./Sections/HeroBanner";
import SearchFilterBar from "./Sections/SearchFilterBar";
import FeaturedCars from "./Sections/FeaturedCars";
import WhyRentWithUs from "./Sections/WhyRentWithUs";
import TopRatedCars from "./Sections/TopRatedCars";
import Statistics from "./Sections/Statistics";
import CustomerTestimonials from "./Sections/CustomerTestimonials";
import FAQ from "./Sections/FAQ";
import CallToAction from "./Sections/CallToAction";
import Newsletter from "./Sections/Newsletter";

const Home = () => {
  useEffect(() => {
    document.title = "Home - RentWheels";
  }, []);

  return (
    <div className="min-h-screen">
      <HeroBanner />

      <SearchFilterBar />

      <FeaturedCars />

      <WhyRentWithUs />

      <TopRatedCars />

      <Statistics />

      <CustomerTestimonials />

      <FAQ />

      <CallToAction />

      <Newsletter />
    </div>
  );
};

export default Home;
