import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { FaCalendarAlt, FaUser, FaCar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllBookings = () => {
  const axios = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "All Bookings - RentWheels Admin";
    fetchAllBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/bookings");
      const bookingsData = response.data;

      const bookingsWithDetails = await Promise.all(
        bookingsData.map(async (booking) => {
          let carDetails = null;
          let userDetails = null;

          try {
            const carResponse = await axios.get(`/cars/${booking.carId}`);
            carDetails = carResponse.data;
          } catch (error) {
            console.error(`Failed to fetch car ${booking.carId}:`, error);
          }

          try {
            const userResponse = await axios.get(`/users/${booking.renterId}`);
            userDetails = userResponse.data;
          } catch (error) {
            console.error(`Failed to fetch user ${booking.renterId}:`, error);
          }

          return {
            ...booking,
            carDetails,
            userDetails,
          };
        })
      );

      setBookings(bookingsWithDetails);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "This will cancel the booking and update car availability",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/admin/bookings/${bookingId}`);
        toast.success("Booking cancelled successfully");
        fetchAllBookings();
      } catch (error) {
        console.error("Error cancelling booking:", error);
        toast.error("Failed to cancel booking");
      }
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (!searchTerm.trim()) return true;
    const lowerQuery = searchTerm.toLowerCase();
    return (
      booking.carDetails?.carName?.toLowerCase().includes(lowerQuery) ||
      booking.userDetails?.displayName?.toLowerCase().includes(lowerQuery) ||
      booking.userDetails?.email?.toLowerCase().includes(lowerQuery)
    );
  });

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.totalPrice || 0),
    0
  );
  const activeBookings = bookings.filter(
    (b) => new Date(b.endDate) >= new Date()
  ).length;
  const completedBookings = bookings.filter(
    (b) => new Date(b.endDate) < new Date()
  ).length;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Gradient Header with Stats */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-6 md:p-8 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">
          All Bookings
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Total Bookings</p>
            <p className="text-2xl md:text-3xl font-bold">{bookings.length}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Active</p>
            <p className="text-2xl md:text-3xl font-bold">{activeBookings}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Completed</p>
            <p className="text-2xl md:text-3xl font-bold">
              {completedBookings}
            </p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Total Revenue</p>
            <p className="text-2xl md:text-3xl font-bold">
              ৳{totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-base-100 rounded-xl p-4 shadow-lg">
        <div className="relative">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-medium h-5 w-5" />
          <input
            type="text"
            placeholder="Search by car name, user name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-12 font-body"
          />
        </div>
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length === 0 ? (
        <div className="bg-base-100 rounded-2xl p-12 shadow-lg text-center">
          <FaCar className="mx-auto text-6xl text-neutral-light mb-4" />
          <p className="text-neutral-medium font-body">
            {searchTerm
              ? "No bookings found matching your search"
              : "No bookings yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-base-100 rounded-xl shadow-lg border-2 border-base-300 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Car Image */}
                <div className="md:w-40 h-48 md:h-auto flex-shrink-0">
                  <img
                    src={
                      booking.carDetails?.imageURL ||
                      "https://via.placeholder.com/300"
                    }
                    alt={booking.carDetails?.carName || "Car"}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Booking Details */}
                <div className="flex-1 p-4 md:p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-heading font-bold text-neutral mb-1">
                        {booking.carDetails?.carName || "Unknown Car"}
                      </h3>
                      <p className="text-sm text-neutral-medium flex items-center gap-1">
                        <FaCar className="text-primary" />
                        {booking.carDetails?.category || "N/A"}
                      </p>
                    </div>
                    {new Date(booking.endDate) >= new Date() ? (
                      <span className="badge badge-success text-white">
                        Active
                      </span>
                    ) : (
                      <span className="badge badge-neutral">Completed</span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FaUser className="text-accent" />
                      <span className="font-semibold">
                        {booking.userDetails?.displayName || "Unknown User"}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-medium pl-6">
                      {booking.userDetails?.email || "N/A"}
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <FaCalendarAlt className="text-primary" />
                      <span>
                        {new Date(booking.startDate).toLocaleDateString()} -{" "}
                        {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-base-300">
                    <div>
                      <p className="text-xs text-neutral-medium">Total Cost</p>
                      <p className="text-xl font-heading font-bold text-primary">
                        ৳{booking.totalPrice || 0}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn btn-error btn-sm text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBookings;
