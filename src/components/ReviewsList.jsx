import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaUser, FaCheckCircle } from "react-icons/fa";

const ReviewsList = ({ reviews, averageRating, totalReviews }) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Average Rating Summary */}
      {totalReviews > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-neutral">
                  {averageRating}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(Math.round(averageRating))}
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold text-neutral">
                  {totalReviews === 1 ? "1 Review" : `${totalReviews} Reviews`}
                </p>
                <p className="text-sm text-neutral-medium">
                  From verified rentals
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Reviews List */}
      {reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FaUser className="text-lg" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-neutral">
                        {review.userName}
                      </p>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success rounded text-xs font-medium">
                        <FaCheckCircle className="text-xs" />
                        <span>Verified Rental</span>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-medium mt-0.5">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>

              <p className="text-neutral leading-relaxed">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-base-100 rounded-xl p-12 shadow-sm border border-base-300 text-center"
        >
          <FaStar className="text-4xl text-base-300 mx-auto mb-3" />
          <p className="text-lg font-semibold text-neutral mb-2">
            No Reviews Yet
          </p>
          <p className="text-neutral-medium">
            Be the first to review this car after renting it!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ReviewsList;
