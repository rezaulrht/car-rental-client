import React, { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";

const UpdateCarModal = ({ car, isOpen, onClose, onUpdate }) => {
  const axios = useAxios();
  const [loading, setLoading] = useState(false);

  const categories = ["Sedan", "SUV", "Hatchback", "Luxury", "Electric"];
  const statuses = ["Available", "Unavailable"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      carName: e.target.carName.value,
      description: e.target.description.value,
      category: e.target.category.value,
      rentPrice: e.target.rentPrice.value,
      location: e.target.location.value,
      imageURL: e.target.imageURL.value,
      status: e.target.status.value,
    };

    try {
      setLoading(true);
      await axios.put(`/cars/${car._id}`, updatedData);
      toast.success("Car updated successfully!");
      onUpdate(); // Refresh the car list
      onClose(); // Close modal
    } catch (error) {
      console.error("Failed to update car:", error);
      toast.error("Failed to update car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-2xl bg-base-100 border-2 border-base-300 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-linear-to-r from-secondary to-secondary/80 -mx-6 -mt-6 px-4 md:px-6 py-3 md:py-4 mb-4 md:mb-6 sticky top-0 z-10">
          <h3 className="font-heading font-bold text-lg md:text-xl text-white">
            Update Car Details
          </h3>
          <p className="text-white/90 font-body text-xs md:text-sm mt-1">
            Modify your car listing information
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 md:space-y-4 px-2 md:px-0"
        >
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-neutral font-body font-medium text-sm">
                Car Name <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              name="carName"
              defaultValue={car?.carName}
              required
              placeholder="e.g., Toyota Camry 2024"
              className="input input-bordered bg-base-100 border-base-300 w-full h-10 text-sm text-neutral placeholder:text-neutral-light font-body focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
            />
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-neutral font-body font-medium text-sm">
                Description <span className="text-error">*</span>
              </span>
            </label>
            <textarea
              name="description"
              defaultValue={car?.description}
              required
              rows="3"
              placeholder="Describe your car's features..."
              className="textarea textarea-bordered bg-base-100 border-base-300 w-full text-sm text-neutral placeholder:text-neutral-light font-body focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-neutral font-body font-medium text-xs md:text-sm">
                  Category
                </span>
              </label>
              <select
                name="category"
                defaultValue={car?.category}
                required
                className="select select-bordered bg-base-100 border-base-300 w-full h-9 md:h-10 min-h-9 md:min-h-10 text-xs md:text-sm text-neutral font-body focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-neutral font-body font-medium text-xs md:text-sm">
                  Price (৳)
                </span>
              </label>
              <input
                type="number"
                name="rentPrice"
                defaultValue={car?.rentPrice}
                required
                min="1"
                step="1"
                className="input input-bordered bg-base-100 border-base-300 w-full h-9 md:h-10 text-xs md:text-sm text-neutral font-body focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-neutral font-body font-medium text-xs md:text-sm">
                  Status
                </span>
              </label>
              <select
                name="status"
                defaultValue={car?.status}
                required
                className="select select-bordered bg-base-100 border-base-300 w-full h-9 md:h-10 min-h-9 md:min-h-10 text-xs md:text-sm text-neutral font-body focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-neutral font-body font-medium text-xs md:text-sm">
                  Location <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                name="location"
                defaultValue={car?.location}
                required
                placeholder="e.g., Dhaka, Bangladesh"
                className="input input-bordered bg-base-100 border-base-300 w-full h-9 md:h-10 text-xs md:text-sm text-neutral placeholder:text-neutral-light font-body focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-neutral font-body font-medium text-xs md:text-sm">
                  Image URL <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="url"
                name="imageURL"
                defaultValue={car?.imageURL}
                required
                placeholder="https://..."
                className="input input-bordered bg-base-100 border-base-300 w-full h-9 md:h-10 text-xs md:text-sm text-neutral placeholder:text-neutral-light font-body focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
          </div>

          <div className="bg-base-200 rounded-lg p-2 md:p-3 border border-base-300">
            <p className="text-xs text-neutral-medium font-body mb-1 md:mb-2 wrap-break-word">
              <strong>Provider:</strong> {car?.providerName} (
              {car?.providerEmail})
            </p>
          </div>

          <div className="modal-action gap-2 md:gap-3 pt-3 md:pt-4 flex-col md:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline btn-sm h-9 md:h-10 px-4 md:px-6 text-xs md:text-sm border-2 border-base-300 text-neutral hover:bg-base-200 hover:border-neutral font-body font-medium transition-all duration-300 w-full md:w-auto order-2 md:order-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-secondary btn-sm h-9 md:h-10 px-4 md:px-6 text-xs md:text-sm font-body font-semibold text-white border-0 hover:scale-105 transition-all duration-300 w-full md:w-auto order-1 md:order-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Updating...
                </>
              ) : (
                "Update Car"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose}></div>
    </dialog>
  );
};

export default UpdateCarModal;
