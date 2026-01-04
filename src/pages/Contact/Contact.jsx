import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    document.title = "Contact Us - RentWheels";
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone",
      content: "+880 1234-567890",
      link: "tel:+8801234567890",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      content: "support@rentwheels.com",
      link: "mailto:support@rentwheels.com",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      content: "House 123, Road 12, Dhanmondi, Dhaka 1209, Bangladesh",
      link: null,
    },
    {
      icon: FaClock,
      title: "Business Hours",
      content: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM",
      link: null,
    },
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
              Get in <span className="text-white">Touch</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-body max-w-3xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <info.icon className="text-2xl text-primary" />
                </div>
                <h3 className="text-lg font-heading font-bold text-neutral mb-2 text-center">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-sm md:text-base text-neutral-medium font-body text-center block hover:text-primary transition-colors"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-sm md:text-base text-neutral-medium font-body text-center">
                    {info.content}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-base-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral mb-4">
              Send Us a <span className="text-primary">Message</span>
            </h2>
            <p className="text-base md:text-lg text-neutral-medium font-body">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-base-100 rounded-2xl p-6 md:p-8 lg:p-12 shadow-xl border-2 border-base-300"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm md:text-base font-medium text-neutral mb-2 font-body">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="input input-bordered bg-base-100 border-base-300 w-full h-12 md:h-14 text-neutral placeholder:text-neutral-light font-body text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-sm md:text-base font-medium text-neutral mb-2 font-body">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="input input-bordered bg-base-100 border-base-300 w-full h-12 md:h-14 text-neutral placeholder:text-neutral-light font-body text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium text-neutral mb-2 font-body">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="input input-bordered bg-base-100 border-base-300 w-full h-12 md:h-14 text-neutral placeholder:text-neutral-light font-body text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium text-neutral mb-2 font-body">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                  className="textarea textarea-bordered bg-base-100 border-base-300 w-full text-neutral placeholder:text-neutral-light font-body text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn btn-primary w-full md:w-auto h-12 md:h-14 px-8 md:px-12 text-base md:text-lg font-body font-semibold text-white border-0 hover:shadow-lg transition-all duration-300"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral mb-4">
              Visit Our <span className="text-primary">Office</span>
            </h2>
            <p className="text-base md:text-lg text-neutral-medium font-body">
              Stop by our headquarters or visit any of our 50+ locations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-xl border-2 border-base-300 h-96"
          >
            <MapContainer
              center={[23.7461, 90.3742]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[23.7461, 90.3742]}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-heading font-bold text-neutral mb-1">
                      RentWheels HQ
                    </h3>
                    <p className="text-sm text-neutral-medium font-body">
                      House 123, Road 12, Dhanmondi
                    </p>
                    <p className="text-sm text-neutral-medium font-body">
                      Dhaka 1209, Bangladesh
                    </p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 md:py-20 bg-base-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral mb-4">
              Need Quick Answers?
            </h2>
            <p className="text-base md:text-lg text-neutral-medium font-body mb-6">
              Check out our FAQ section for instant answers to common questions
            </p>
            <a
              href="/#faq"
              className="btn btn-outline border-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-primary h-12 md:h-14 px-8 md:px-10 text-base md:text-lg font-body font-semibold"
            >
              View FAQs
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
