import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaTrash,
  FaEdit,
  FaCar,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AuthContext from "../../contexts/AuthContext";
import Loader from "../../components/Loader";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [editHover, setEditHover] = useState(0);

  useEffect(() => {
    fetchMyReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMyReviews = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/reviews?userId=${user.uid}`);
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
      await axiosSecure.delete(`/reviews/${reviewId}`);
      toast.success("Review deleted successfully");
      fetchMyReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(error.response?.data?.message || "Failed to delete review");
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setEditRating(0);
    setEditComment("");
    setEditHover(0);
  };

  const handleUpdateReview = async (reviewId) => {
    if (editRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (editComment.trim().length < 10) {
      toast.error("Please write at least 10 characters");
      return;
    }

    if (editComment.length > 500) {
      toast.error("Review must be less than 500 characters");
      return;
    }

    try {
      await axiosSecure.put(`/reviews/${reviewId}`, {
        rating: editRating,
        comment: editComment,
      });
      toast.success("Review updated successfully");
      handleCancelEdit();
      fetchMyReviews();
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error(error.response?.data?.message || "Failed to update review");
    }
  };

  const renderStars = (
    rating,
    isEditable = false,
    onStarClick = null,
    onStarHover = null,
    hoverValue = 0
  ) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            onClick={() => isEditable && onStarClick && onStarClick(star)}
            onMouseEnter={() => isEditable && onStarHover && onStarHover(star)}
            onMouseLeave={() => isEditable && onStarHover && onStarHover(0)}
            className={`text-xl ${
              star <= (isEditable ? hoverValue || rating : rating)
                ? "text-warning"
                : "text-base-300"
            } ${
              isEditable
                ? "cursor-pointer hover:scale-110 transition-transform"
                : ""
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 md:px-8 lg:px-10 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral mb-2">
            My Reviews
          </h1>
          <p className="text-neutral-medium font-body">
            Manage your car rental reviews
          </p>
        </motion.div>

        {reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-lg p-12 text-center"
          >
            <FaStar className="text-6xl text-base-300 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-neutral mb-2">
              No Reviews Yet
            </h2>
            <p className="text-neutral-medium font-body">
              Complete a booking to leave your first review!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-lg p-6"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  {/* Car Image */}
                  <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-base-200">
                    <img
                      src={review.carImage}
                      alt={review.carName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FaCar className="text-primary" />
                          <h3 className="text-xl font-heading font-bold text-neutral">
                            {review.carName}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-medium mb-3">
                          <FaCalendarAlt />
                          <span>
                            Reviewed on{" "}
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success rounded text-xs font-medium">
                            <FaCheckCircle className="text-xs" />
                            <span>Verified Rental</span>
                          </div>
                        </div>
                      </div>
                      {!editingReview && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(review)}
                            className="btn btn-sm btn-primary text-white border-0"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(review._id)}
                            className="btn btn-sm btn-error text-white border-0"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>

                    {editingReview === review._id ? (
                      <div className="space-y-4 bg-base-200 rounded-xl p-4">
                        <div>
                          <label className="text-sm font-semibold text-neutral mb-2 block">
                            Rating
                          </label>
                          {renderStars(
                            editRating,
                            true,
                            setEditRating,
                            setEditHover,
                            editHover
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-neutral mb-2 block">
                            Comment
                          </label>
                          <textarea
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            className="textarea textarea-bordered w-full h-24 font-body"
                            placeholder="Write your review..."
                          />
                          <p className="text-xs text-neutral-medium mt-1">
                            {editComment.length}/500 characters
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateReview(review._id)}
                            className="btn btn-primary btn-sm text-white"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="btn btn-ghost btn-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {renderStars(review.rating)}
                        <p className="text-neutral leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    )}
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

export default MyReviews;
