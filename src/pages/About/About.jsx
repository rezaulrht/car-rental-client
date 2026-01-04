import React, { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaCar,
  FaUsers,
  FaShieldAlt,
  FaHandshake,
  FaAward,
  FaGlobeAmericas,
} from "react-icons/fa";

const About = () => {
  useEffect(() => {
    document.title = "About Us - RentWheels";
  }, []);

  const values = [
    {
      icon: FaShieldAlt,
      title: "Trust & Safety",
      description:
        "Your safety is our priority. All vehicles are thoroughly inspected and fully insured.",
    },
    {
      icon: FaHandshake,
      title: "Customer First",
      description:
        "We're committed to providing exceptional service and support throughout your rental journey.",
    },
    {
      icon: FaAward,
      title: "Quality Fleet",
      description:
        "Choose from our premium selection of well-maintained vehicles from top brands.",
    },
    {
      icon: FaGlobeAmericas,
      title: "Nationwide Coverage",
      description:
        "With 50+ locations across the country, we're always close by when you need us.",
    },
  ];

  const stats = [
    { number: "500+", label: "Premium Vehicles" },
    { number: "5000+", label: "Happy Customers" },
    { number: "50+", label: "Locations" },
    { number: "10+", label: "Years Experience" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary text-white py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              About <span className="text-white">RentWheels</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-body max-w-3xl mx-auto leading-relaxed">
              Your trusted partner for premium car rentals across the nation.
              Drive your dreams with confidence and comfort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-neutral-medium font-body leading-relaxed">
                <p>
                  Founded in 2016, RentWheels started with a simple mission: to
                  make car rental easy, affordable, and accessible for everyone.
                  What began as a small local operation has grown into a
                  nationwide network serving thousands of satisfied customers.
                </p>
                <p>
                  We understand that every journey is unique. Whether you're
                  planning a family vacation, a business trip, or just need a
                  reliable vehicle for the weekend, RentWheels has the perfect
                  car waiting for you.
                </p>
                <p>
                  Our commitment to excellence, combined with cutting-edge
                  technology and personalized service, has made us a leader in
                  the car rental industry. We're not just renting cars – we're
                  enabling experiences, creating memories, and building lasting
                  relationships with our customers.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12">
                <img
                  src="/logo.png"
                  alt="RentWheels Logo"
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6"
                />
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-neutral mb-4">
                  Why Choose RentWheels?
                </h3>
                <ul className="space-y-3 text-neutral-medium font-body">
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Wide selection of premium vehicles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Competitive pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>24/7 customer support and roadside assistance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Easy online booking and management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Flexible rental periods and locations</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-base-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-base md:text-lg text-neutral-medium font-body max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                  <value.icon className="text-3xl md:text-4xl text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-heading font-bold text-neutral mb-3 text-center">
                  {value.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-medium font-body text-center leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral mb-4">
              RentWheels by the <span className="text-primary">Numbers</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 md:p-8 text-center border-2 border-base-300"
              >
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-2">
                  {stat.number}
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-neutral-medium font-body">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary via-primary-dark to-primary">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaUsers className="text-6xl md:text-7xl text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-body mb-8 leading-relaxed">
              Join thousands of satisfied customers who trust RentWheels for
              their car rental needs. Browse our fleet and book your perfect
              ride today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-white text-primary hover:bg-white/90 border-0 h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-body font-semibold shadow-xl"
                >
                  Browse Cars
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-primary hover:border-white h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-body font-semibold"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
