import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaShieldAlt, FaDollarSign, FaClock, FaHeadset } from "react-icons/fa";

const WhyRentWithUs = () => {
  const features = [
    {
      id: 1,
      icon: FaShieldAlt,
      title: "Fully Insured",
      description:
        "All vehicles come with comprehensive insurance coverage for your peace of mind",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: 2,
      icon: FaDollarSign,
      title: "Best Prices",
      description:
        "Competitive rates with transparent pricing and no hidden fees",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      id: 3,
      icon: FaClock,
      title: "24/7 Availability",
      description:
        "Book anytime, pick up anytime with our round-the-clock service",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      id: 4,
      icon: FaHeadset,
      title: "Customer Support",
      description:
        "Dedicated support team ready to assist you throughout your journey",
      color: "text-error",
      bgColor: "bg-error/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 lg:py-20 px-6 lg:px-10 bg-linear-to-br from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.img
            src="/logo.png"
            alt="RentWheels Logo"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="w-20 h-20 lg:w-24 lg:h-24 object-contain mx-auto mb-4"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral mb-4">
            Why Rent <span className="text-primary">With Us</span>
          </h2>
          <p className="text-lg lg:text-xl text-neutral-medium font-body max-w-2xl mx-auto">
            Experience the difference with our premium service and commitment to
            excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 },
              }}
              className="bg-base-100 rounded-2xl p-6 lg:p-8 border-2 border-base-300 hover:border-primary/30 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 lg:w-20 lg:h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4`}
              >
                <feature.icon
                  className={`text-3xl lg:text-4xl ${feature.color}`}
                />
              </motion.div>

              <h3 className="text-xl lg:text-2xl font-heading font-bold text-neutral mb-3">
                {feature.title}
              </h3>

              <p className="text-base lg:text-lg text-neutral-medium font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyRentWithUs;
