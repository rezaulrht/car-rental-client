import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaPaperPlane, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Successfully subscribed to our newsletter!");
    setEmail("");
  };

  return (
    <section className="relative py-20 lg:py-24 px-6 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary via-primary-dark to-info"></div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern
            id="newsletter-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#newsletter-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6"
        >
          <FaEnvelope className="text-4xl lg:text-5xl text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4"
        >
          Stay in the Loop!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl text-white/90 font-body mb-8"
        >
          Get exclusive deals, special offers, and the latest updates delivered
          straight to your inbox.
        </motion.p>

        <motion.form
          onSubmit={handleSubscribe}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 lg:gap-4 max-w-lg lg:max-w-2xl mx-auto"
        >
          <div className="relative flex-1">
            <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-medium text-lg lg:text-xl" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full pl-14 lg:pl-16 pr-6 py-4 lg:py-5 rounded-full text-neutral font-body text-base lg:text-lg bg-white focus:outline-none focus:ring-4 focus:ring-secondary/50 shadow-lg transition-all"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 30px rgba(245, 158, 11, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-secondary btn-lg lg:btn-xl rounded-full px-8 lg:px-10 text-white border-0 font-body font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <FaPaperPlane className="mr-2" />
            Subscribe
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm font-body"
        >
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-accent text-lg" />
            <span>Weekly Deals</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-accent text-lg" />
            <span>Exclusive Offers</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-accent text-lg" />
            <span>No Spam</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs text-white/60 font-body mt-6"
        >
          🔒 We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;
