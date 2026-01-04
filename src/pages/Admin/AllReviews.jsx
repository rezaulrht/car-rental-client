import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaTrash,
  FaCar,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get("/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      await axiosSecure.delete(`/admin/reviews/${reviewId}`);
      toast.success("Review deleted successfully");
      fetchAllReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(error.response?.data?.message || "Failed to delete review");
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-sm ${
              star <= rating ? "text-warning" : "text-base-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(
    (review) =>
      review.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8 lg:px-10 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral mb-2">
            All Reviews
          </h1>
          <p className="text-neutral-medium font-body">
            Manage all customer reviews
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-medium" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-12 font-body"
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-base-100 rounded-xl border-2 border-base-300 shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FaStar className="text-xl text-primary" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-neutral">
                  {reviews.length}
                </p>
                <p className="text-sm text-neutral-medium font-body">
                  Total Reviews
                </p>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl border-2 border-base-300 shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <FaStar className="text-xl text-warning" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-neutral">
                  {reviews.length > 0
                    ? (
                        reviews.reduce((sum, r) => sum + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)
                    : "0.0"}
                </p>
                <p className="text-sm text-neutral-medium font-body">
                  Average Rating
                </p>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl border-2 border-base-300 shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-xl text-success" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-neutral">
                  {reviews.filter((r) => r.rating >= 4).length}
                </p>
                <p className="text-sm text-neutral-medium font-body">
                  Positive Reviews
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-lg p-12 text-center"
          >
            <FaStar className="text-6xl text-base-300 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-neutral mb-2">
              {searchTerm ? "No Matching Reviews" : "No Reviews Yet"}
            </h2>
            <p className="text-neutral-medium font-body">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Reviews will appear here once customers start rating cars"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                  {/* Car Image */}
                  <div className="w-full lg:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-base-200">
                    <img
                      src={review.carImage}
                      alt={review.carName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FaCar className="text-primary" />
                          <h3 className="text-xl font-heading font-bold text-neutral">
                            {review.carName}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-medium mb-3">
                          <div className="flex items-center gap-2">
                            <FaUser />
                            <span>{review.userName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt />
                            <span>
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success rounded text-xs font-medium">
                            <FaCheckCircle className="text-xs" />
                            <span>Verified</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="btn btn-sm btn-error text-white border-0"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {renderStars(review.rating)}
                      <p className="text-neutral leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
