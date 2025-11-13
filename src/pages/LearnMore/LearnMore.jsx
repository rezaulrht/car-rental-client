import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaDollarSign,
  FaClock,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";

const LearnMore = () => {
  useEffect(() => {
    document.title = "Learn More - RentWheels";
  }, []);

  const features = [
    {
      icon: FaShieldAlt,
      title: "Fully Insured Vehicles",
      description:
        "Every vehicle in our fleet comes with comprehensive insurance coverage, giving you complete peace of mind during your journey.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: FaDollarSign,
      title: "Transparent Pricing",
      description:
        "No hidden fees, no surprises. Our competitive rates are clear and upfront, ensuring you get the best value for your money.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: FaClock,
      title: "24/7 Availability",
      description:
        "Book anytime, pick up anytime. Our round-the-clock service ensures your travel plans are never compromised.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: FaHeadset,
      title: "Dedicated Support",
      description:
        "Our customer support team is always ready to assist you throughout your rental journey, ensuring a smooth experience.",
      color: "text-error",
      bgColor: "bg-error/10",
    },
  ];

  const benefits = [
    "Wide selection of premium vehicles",
    "Easy online booking process",
    "Flexible rental periods",
    "Well-maintained and sanitized cars",
    "Multiple pickup and drop-off locations",
    "Instant booking confirmation",
    "Verified and trusted car providers",
    "Secure payment gateway",
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <section className="relative bg-linear-to-br from-primary via-primary-dark to-info text-white py-20 lg:py-24 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern
              id="learn-more-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#learn-more-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center mb-6 lg:mb-8"
          >
            <img
              src="/logo.png"
              alt="RentWheels Logo"
              className="w-32 h-32 lg:w-40 lg:h-40 bg-white object-contain drop-shadow-2xl"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6"
          >
            About <span className="text-secondary">RentWheels</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 font-body max-w-3xl mx-auto"
          >
            Your trusted partner for premium car rentals. Experience seamless
            booking, top-quality vehicles, and exceptional service.
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral mb-4">
              Why Choose <span className="text-primary">Us</span>
            </h2>
            <p className="text-lg lg:text-xl text-neutral-medium font-body max-w-2xl mx-auto">
              We provide everything you need for a perfect car rental experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl p-8 lg:p-10 border-2 border-base-300 hover:border-primary/30 transition-all"
              >
                <div
                  className={`w-16 h-16 lg:w-20 lg:h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4`}
                >
                  <feature.icon
                    className={`text-3xl lg:text-4xl ${feature.color}`}
                  />
                </div>
                <h3 className="text-2xl lg:text-3xl font-heading font-bold text-neutral mb-3">
                  {feature.title}
                </h3>
                <p className="text-base lg:text-lg text-neutral-medium font-body leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 px-6 lg:px-10 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral mb-4">
              What You <span className="text-primary">Get</span>
            </h2>
            <p className="text-lg lg:text-xl text-neutral-medium font-body max-w-2xl mx-auto">
              Comprehensive benefits that make your rental experience
              exceptional
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-base-300"
              >
                <FaCheckCircle className="text-accent text-xl shrink-0" />
                <span className="text-neutral font-body">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-br from-primary to-info text-white rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Ready to Hit the Road?
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-body mb-8">
              Browse our extensive collection of vehicles and book your perfect
              ride today!
            </p>
            <motion.a
              href="/browse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary btn-lg text-white border-0 px-12 font-body font-semibold shadow-lg"
            >
              Browse Cars
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;
