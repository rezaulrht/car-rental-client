import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaUser,
  FaCar,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaShieldAlt,
  FaClock,
  FaChevronRight,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";
import CarBooking from "./CarBooking";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    fetchCarDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (car) {
      document.title = `${car.carName} - RentWheels`;
    }
  }, [car]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/cars/${id}`);
      setCar(response.data);
    } catch (error) {
      console.error("Error fetching car details:", error);
      toast.error("Failed to load car details");
      navigate("/browse");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!car) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 md:mb-6"
        >
          <div className="flex items-center gap-2 text-xs md:text-sm font-body">
            <Link
              to="/"
              className="text-neutral-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <FaChevronRight className="text-neutral-light text-xs" />
            <Link
              to="/browse"
              className="text-neutral-medium hover:text-primary transition-colors"
            >
              Browse Cars
            </Link>
            <FaChevronRight className="text-neutral-light text-xs" />
            <span className="text-neutral font-medium truncate">{car.carName}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4 md:space-y-6"
          >
            <div className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-xl overflow-hidden">
              <div className="relative h-56 md:h-96 overflow-hidden bg-base-200">
                <img
                  src={car.imageURL}
                  alt={car.carName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 md:top-4 right-3 md:right-4">
                  <span
                    className={`badge badge-md md:badge-lg border-0 font-body font-semibold shadow-lg ${
                      car.status === "Available"
                        ? "bg-accent text-white"
                        : "bg-error text-white"
                    }`}
                  >
                    {car.status}
                  </span>
                </div>
                <div className="absolute top-3 md:top-4 left-3 md:left-4">
                  <span className="badge badge-md md:badge-lg bg-base-100 text-neutral border-0 font-body font-medium shadow-lg">
                    {car.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-xl p-4 md:p-6 lg:p-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-neutral mb-4">
                {car.carName}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-3 p-3 md:p-4 bg-base-200 rounded-xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <FaUser className="text-lg md:text-xl text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-neutral-medium font-body">
                      Owner
                    </p>
                    <p className="text-sm md:text-base font-heading font-semibold text-neutral truncate">
                      {car.providerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 md:p-4 bg-base-200 rounded-xl">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-lg md:text-xl text-secondary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-neutral-medium font-body">
                      Location
                    </p>
                    <p className="text-sm md:text-base font-heading font-semibold text-neutral truncate">
                      {car.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-heading font-bold text-neutral mb-2 md:mb-3 flex items-center gap-2">
                  <FaCar className="text-primary" />
                  About This Car
                </h2>
                <p className="text-sm md:text-base text-neutral-medium font-body leading-relaxed">
                  {car.description}
                </p>
              </div>

              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between p-3 md:p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <FaCalendarAlt className="text-primary text-sm md:text-base" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-medium font-body">
                        Listed Date
                      </p>
                      <p className="text-xs md:text-sm font-heading font-semibold text-neutral">
                        {new Date(car.dateAdded).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <FaShieldAlt className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-medium font-body">
                        Status
                      </p>
                      <p className="text-sm font-heading font-semibold text-neutral">
                        Verified & Insured
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <FaClock className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-medium font-body">
                        Availability
                      </p>
                      <p className="text-sm font-heading font-semibold text-neutral">
                        {car.status === "Available"
                          ? "Ready to Book"
                          : "Not Available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-xl p-6 sticky top-24">
              <div className="bg-primary/10 rounded-xl p-6 mb-6 border border-primary/20">
                <p className="text-sm text-neutral-medium font-body mb-1">
                  Daily Rental Rate
                </p>
                <p className="text-4xl font-heading font-bold text-primary">
                  ৳{Number(car.rentPrice).toLocaleString()}
                </p>
                <p className="text-xs text-neutral-medium font-body mt-1">
                  per day
                </p>
              </div>

              {car.status === "Available" ? (
                <div className="bg-accent/10 rounded-xl p-4 mb-6 border border-accent/20">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-accent text-xl" />
                    <span className="font-body font-semibold text-accent">
                      Available for Booking
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-error/10 rounded-xl p-4 mb-6 border border-error/20">
                  <div className="flex items-center gap-2">
                    <span className="font-body font-semibold text-error">
                      Currently Unavailable
                    </span>
                  </div>
                </div>
              )}

              {car.status === "Available" && (
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="btn btn-primary w-full h-14 text-lg font-body font-semibold text-white border-0 hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-base-300">
                <h3 className="text-lg font-heading font-bold text-neutral mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-neutral-medium font-body">
                    <FaCheckCircle className="text-accent text-sm" />
                    <span>Verified Owner</span>
                  </li>
                  <li className="flex items-center gap-2 text-neutral-medium font-body">
                    <FaCheckCircle className="text-accent text-sm" />
                    <span>Clean & Well-Maintained</span>
                  </li>
                  <li className="flex items-center gap-2 text-neutral-medium font-body">
                    <FaCheckCircle className="text-accent text-sm" />
                    <span>24/7 Support</span>
                  </li>
                  <li className="flex items-center gap-2 text-neutral-medium font-body">
                    <FaCheckCircle className="text-accent text-sm" />
                    <span>Flexible Booking</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CarBooking
        car={car}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
};

export default CarDetails;
