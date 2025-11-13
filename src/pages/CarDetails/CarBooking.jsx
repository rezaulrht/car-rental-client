import React, { useState, use } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AuthContext from "../../contexts/AuthContext";

const CarBooking = ({ car, isOpen, onClose }) => {
  const navigate = useNavigate();
  const axios = useAxiosSecure();
  const { user } = use(AuthContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const calculateBookingDetails = () => {
    if (!startDate || !endDate || !car) return { days: 0, totalPrice: 0 };

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // js date substration er value milisecond ey dey
    const totalPrice = days > 0 ? days * Number(car.rentPrice) : 0;

    return { days, totalPrice };
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (user.uid === car.providerUid || user.uid === car.providerId) {
      toast.error("You cannot book your own car");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      toast.error("Start date cannot be in the past");
      return;
    }

    if (end <= start) {
      toast.error("End date must be after start date");
      return;
    }

    const { days, totalPrice } = calculateBookingDetails();

    const bookingData = {
      carId: car._id,
      renterId: user.uid,
      startDate: startDate,
      endDate: endDate,
      totalDays: days,
      totalPrice: totalPrice,
      status: "Confirmed",
      bookingDate: new Date().toISOString().split("T")[0],
    };

    try {
      setBookingLoading(true);
      await axios.post("/bookings", bookingData);

      // Update car status to Unavailable
      await axios.patch(`/cars/${car._id}`, { status: "Unavailable" });

      toast.success("Car booked successfully!");
      onClose();
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-md lg:max-w-lg bg-base-100 border-2 border-base-300 shadow-2xl">
        <div className="bg-primary px-6 py-4 lg:px-8 lg:py-6 -mx-6 -mt-6 mb-6">
          <h3 className="font-heading font-bold text-xl lg:text-2xl text-white">
            Book {car.carName}
          </h3>
          <p className="text-white/90 font-body text-sm lg:text-base mt-1">
            Select your rental dates
          </p>
        </div>

        <form onSubmit={handleBooking} className="space-y-6 lg:space-y-8">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral font-body font-medium text-sm lg:text-base">
                Start Date <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
              className="input input-bordered bg-base-100 border-base-300 w-full h-12 lg:h-14 text-neutral font-body text-base lg:text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral font-body font-medium text-sm lg:text-base">
                End Date <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={
                startDate ||
                new Date(Date.now() + 86400000).toISOString().split("T")[0]
              }
              required
              className="input input-bordered bg-base-100 border-base-300 w-full h-12 lg:h-14 text-neutral font-body text-base lg:text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {startDate && endDate && calculateBookingDetails().totalPrice > 0 && (
            <div className="bg-base-200 rounded-xl p-4 lg:p-6 space-y-2">
              <div className="flex justify-between text-neutral-medium font-body text-sm lg:text-base">
                <span>Daily Rate:</span>
                <span>৳{Number(car.rentPrice).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-medium font-body text-sm lg:text-base">
                <span>Number of Days:</span>
                <span>{calculateBookingDetails().days}</span>
              </div>
              <div className="border-t border-base-300 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-body font-semibold text-neutral text-base lg:text-lg">
                    Total Price:
                  </span>
                  <span className="text-2xl font-heading font-bold text-primary">
                    ৳{calculateBookingDetails().totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost flex-1 h-12 font-body font-semibold text-neutral hover:bg-base-200"
              disabled={bookingLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={bookingLoading}
              className="btn btn-primary flex-1 h-12 font-body font-semibold text-white border-0"
            >
              {bookingLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default CarBooking;
