import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const CustomerTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Traveler",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "Excellent service! The booking process was seamless and the car was in perfect condition. Will definitely use RentWheels again for my next trip.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Vacation Planner",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "Great selection of vehicles at competitive prices. The customer support team was very helpful and responsive. Highly recommend!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Weekend Explorer",
      image: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      text: "Love how easy it is to find and book the perfect car. The entire experience exceeded my expectations from start to finish.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
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
    <section className="py-16 lg:py-20 px-6 lg:px-10 bg-linear-to-br from-base-100 via-primary/5 to-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
            Customer <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-lg lg:text-xl text-neutral-medium font-body max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              }}
              className="bg-base-100 rounded-2xl p-8 lg:p-10 border-2 border-base-300 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 opacity-5">
                <FaQuoteLeft className="text-8xl text-primary" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary/20"
                  />
                  <div>
                    <h4 className="text-lg font-heading font-bold text-neutral">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-neutral-medium font-body">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <FaStar className="text-secondary text-lg" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-base text-neutral-medium font-body leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
