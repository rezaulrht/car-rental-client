import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaCar,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

const CallToAction = () => {
  const features = [
    { icon: FaClock, text: "24/7 Availability" },
    { icon: FaShieldAlt, text: "Fully Insured" },
    { icon: FaCheckCircle, text: "Best Prices" },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary via-primary-dark to-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-white space-y-6 md:space-y-8"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight">
              Ready to Hit the Road?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/90 font-body leading-relaxed">
              Join thousands of satisfied customers who trust RentWheels for
              their car rental needs. Book your perfect ride today and
              experience the freedom of the open road.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0">
                    <feature.icon className="text-lg md:text-xl text-white" />
                  </div>
                  <span className="text-base md:text-lg font-body font-medium text-white">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/browse">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-white text-primary hover:bg-white/90 border-0 h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-body font-semibold shadow-xl w-full sm:w-auto"
                >
                  <FaCar className="text-xl md:text-2xl" />
                  Browse Cars
                  <FaArrowRight className="text-lg md:text-xl" />
                </motion.button>
              </Link>
              <Link to="/learn-more">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-primary hover:border-white h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-body font-semibold w-full sm:w-auto"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border-2 border-white/20 shadow-2xl"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <FaCar className="text-3xl text-primary" />
                    </div>
                    <div className="text-white">
                      <h3 className="text-2xl font-heading font-bold">500+</h3>
                      <p className="text-white/80 font-body">Premium Cars</p>
                    </div>
                  </div>
                  <div className="h-px bg-white/20"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-3xl text-accent" />
                    </div>
                    <div className="text-white">
                      <h3 className="text-2xl font-heading font-bold">5000+</h3>
                      <p className="text-white/80 font-body">Happy Customers</p>
                    </div>
                  </div>
                  <div className="h-px bg-white/20"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <FaShieldAlt className="text-3xl text-secondary" />
                    </div>
                    <div className="text-white">
                      <h3 className="text-2xl font-heading font-bold">100%</h3>
                      <p className="text-white/80 font-body">Secure Bookings</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
