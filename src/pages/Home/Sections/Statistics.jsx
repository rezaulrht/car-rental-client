import React from "react";
import { motion } from "framer-motion";
import { FaCar, FaUsers, FaMapMarkedAlt, FaStar } from "react-icons/fa";

const Statistics = () => {
  const stats = [
    {
      icon: FaCar,
      number: "500+",
      label: "Premium Cars",
      color: "primary",
    },
    {
      icon: FaUsers,
      number: "5000+",
      label: "Happy Customers",
      color: "secondary",
    },
    {
      icon: FaMapMarkedAlt,
      number: "50+",
      label: "Locations",
      color: "accent",
    },
    {
      icon: FaStar,
      number: "4.8/5",
      label: "Average Rating",
      color: "warning",
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral mb-4">
            Our <span className="text-primary">Journey</span> So Far
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-neutral-medium font-body max-w-2xl mx-auto">
            Trusted by thousands of customers across the nation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-base-100 rounded-2xl shadow-xl border-2 border-base-300 p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-${stat.color}/10 rounded-full flex items-center justify-center`}
              >
                <stat.icon
                  className={`text-3xl md:text-4xl text-${stat.color}`}
                />
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral mb-2">
                {stat.number}
              </h3>
              <p className="text-base md:text-lg text-neutral-medium font-body">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
