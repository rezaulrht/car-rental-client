import React, { useEffect, useState } from "react";
import { HiCollection, HiSearch } from "react-icons/hi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllBookings = () => {
  const axios = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    document.title = "All Bookings - RentWheels Admin";
    fetchAllBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/bookings");
      console.log("Fetched bookings:", response.data);
      setBookings(response.data);
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
    const matchesSearch =
      booking.carDetails?.carModel
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.userDetails?.displayName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.userDetails?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && new Date(booking.endDate) >= new Date()) ||
      (filterStatus === "completed" && new Date(booking.endDate) < new Date());

    return matchesSearch && matchesFilter;
  });

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.totalCost || 0),
    0
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral mb-2">
              <HiCollection className="inline mr-3 text-primary" />
              All Bookings
            </h1>
            <p className="text-base text-neutral-medium font-body">
              Manage all bookings on the platform
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-medium font-body">
              Total Revenue
            </p>
            <p className="text-3xl font-heading font-bold text-success">
              ৳{totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-medium h-5 w-5" />
            <input
              type="text"
              placeholder="Search by car, user name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-12 font-body"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select select-bordered font-body"
          >
            <option value="all">All Bookings</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-base-300">
                <th className="font-heading text-neutral">Car</th>
                <th className="font-heading text-neutral">User</th>
                <th className="font-heading text-neutral">Dates</th>
                <th className="font-heading text-neutral">Cost</th>
                <th className="font-heading text-neutral">Status</th>
                <th className="font-heading text-neutral">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-base-300 hover:bg-base-200"
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-lg">
                          <img
                            src={booking.carDetails?.imageUrl}
                            alt={booking.carDetails?.carModel}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-body font-semibold text-neutral">
                          {booking.carDetails?.carModel}
                        </p>
                        <p className="font-body text-xs text-neutral-medium">
                          {booking.carDetails?.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="font-body font-semibold text-neutral">
                      {booking.userDetails?.displayName}
                    </p>
                    <p className="font-body text-xs text-neutral-medium">
                      {booking.userDetails?.email}
                    </p>
                  </td>
                  <td>
                    <p className="font-body text-sm text-neutral">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </p>
                    <p className="font-body text-xs text-neutral-medium">
                      to {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td>
                    <p className="font-heading font-bold text-primary">
                      ৳{booking.totalCost}
                    </p>
                  </td>
                  <td>
                    {new Date(booking.endDate) >= new Date() ? (
                      <span className="badge badge-success text-white">
                        Active
                      </span>
                    ) : (
                      <span className="badge badge-neutral">Completed</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn btn-error btn-sm text-white"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <HiCollection className="mx-auto text-6xl text-neutral-light mb-4" />
            <p className="text-neutral-medium font-body">
              {searchTerm || filterStatus !== "all"
                ? "No bookings found matching your filters"
                : "No bookings yet"}
            </p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-base-100 rounded-xl p-6 shadow-lg border-2 border-base-300 text-center">
          <p className="text-neutral-medium font-body mb-2">Total Bookings</p>
          <p className="text-3xl font-heading font-bold text-primary">
            {bookings.length}
          </p>
        </div>
        <div className="bg-base-100 rounded-xl p-6 shadow-lg border-2 border-base-300 text-center">
          <p className="text-neutral-medium font-body mb-2">Active Bookings</p>
          <p className="text-3xl font-heading font-bold text-accent">
            {bookings.filter((b) => new Date(b.endDate) >= new Date()).length}
          </p>
        </div>
        <div className="bg-base-100 rounded-xl p-6 shadow-lg border-2 border-base-300 text-center">
          <p className="text-neutral-medium font-body mb-2">
            Completed Bookings
          </p>
          <p className="text-3xl font-heading font-bold text-neutral-medium">
            {bookings.filter((b) => new Date(b.endDate) < new Date()).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
