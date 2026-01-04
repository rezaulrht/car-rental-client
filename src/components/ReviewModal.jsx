import React, { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const ReviewModal = ({ isOpen, onClose, booking, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Please write at least 10 characters");
      return;
    }

    if (comment.length > 500) {
      toast.error("Review must be less than 500 characters");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ rating, comment });
      setRating(0);
      setComment("");
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-base-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-base-100 border-b border-base-300 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral">
              Write a Review
            </h2>
            <p className="text-sm md:text-base text-neutral-medium font-body mt-1">
              Share your experience with{" "}
              <span className="font-semibold text-primary">
                {booking?.carDetails?.carName}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle text-neutral-medium hover:text-error"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Car Info */}
          <div className="bg-base-200 rounded-xl p-4 flex items-center gap-4">
            <img
              src={booking?.carDetails?.imageURL}
              alt={booking?.carDetails?.carName}
              className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg md:text-xl font-heading font-bold text-neutral">
                {booking?.carDetails?.carName}
              </h3>
              <p className="text-sm text-neutral-medium font-body">
                {new Date(booking?.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(booking?.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-base md:text-lg font-medium text-neutral mb-3 font-heading">
              Rate Your Experience *
            </label>
            <div className="flex gap-2 md:gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <FaStar
                    className={`text-3xl md:text-4xl lg:text-5xl transition-colors duration-200 ${
                      star <= (hover || rating)
                        ? "text-warning"
                        : "text-base-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-neutral-medium font-body mt-2">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-base md:text-lg font-medium text-neutral mb-2 font-heading">
              Your Review *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your rental experience... (min 10 characters)"
              rows="6"
              maxLength="500"
              className="textarea textarea-bordered bg-base-100 border-base-300 w-full text-neutral placeholder:text-neutral-light font-body text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-neutral-medium font-body">
                Minimum 10 characters
              </p>
              <p
                className={`text-xs font-body ${
                  comment.length > 450 ? "text-error" : "text-neutral-medium"
                }`}
              >
                {comment.length}/500
              </p>
            </div>
          </div>

          {/* Badge */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <p className="text-sm text-neutral-medium font-body flex items-center gap-2">
              <span className="badge badge-primary badge-sm">
                Verified Rental
              </span>
              Your review will show as a verified rental
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-base-100 border-t border-base-300 p-6 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={submitting}
            className="btn btn-outline border-2 border-base-300 hover:border-base-300 hover:bg-base-200 h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-body font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || rating === 0 || comment.trim().length < 10}
            className="btn btn-primary text-white border-0 h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-body font-semibold disabled:opacity-50"
          >
            {submitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
