import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import CarsCard from "../../../components/CarsCard";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";

const TopRatedCars = () => {
  const axios = useAxios();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopRatedCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTopRatedCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/cars");
      // Get 6 cars for showcase (you can implement rating logic later)
      const topRatedCars = response.data.slice(0, 6);
      setCars(topRatedCars);
    } catch (error) {
      console.error("Error fetching top rated cars:", error);
      toast.error("Failed to load top rated cars");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 lg:py-20 px-6 lg:px-10 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FaStar className="text-2xl text-secondary" />
              </motion.div>
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral mb-4">
            Top Rated <span className="text-primary">Cars</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-linear-to-r from-primary to-secondary mx-auto rounded-full"
          ></motion.div>
          <p className="text-lg lg:text-xl text-neutral-medium font-body mt-4 max-w-2xl mx-auto">
            Our most popular and highly-rated vehicles chosen by customers
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}

        {!loading && cars.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {cars.map((car) => (
              <motion.div
                key={car._id}
                variants={cardVariants}
                whileHover={{
                  y: -15,
                  boxShadow: "0 25px 50px rgba(37, 99, 235, 0.15)",
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <CarsCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && cars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-neutral-medium font-body">
              No top rated cars available at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TopRatedCars;
