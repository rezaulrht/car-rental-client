import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxios";
import CarsCard from "../../../components/CarsCard";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";

const FeaturedCars = () => {
  const axios = useAxios();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/cars");
      // Get 6 random cars
      const allCars = response.data;
      const shuffled = [...allCars].sort(() => 0.5 - Math.random());
      const featuredCars = shuffled.slice(0, 6);
      setCars(featuredCars);
    } catch (error) {
      console.error("Error fetching featured cars:", error);
      toast.error("Failed to load featured cars");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
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
    <section className="py-16 lg:py-20 px-6 lg:px-10 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral mb-4">
            Featured <span className="text-primary">Cars</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-primary mx-auto rounded-full"
          ></motion.div>
          <p className="text-lg lg:text-xl text-neutral-medium font-body mt-4 max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles
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
                whileHover={{ scale: 1.03 }}
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
              No featured cars available at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;
