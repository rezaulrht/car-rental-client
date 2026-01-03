import React, { useEffect, useState } from "react";
import { HiViewGrid, HiSearch } from "react-icons/hi";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllCars = () => {
  const axios = useAxiosSecure();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "All Cars - RentWheels Admin";
    fetchAllCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId, carName) => {
    const result = await Swal.fire({
      title: "Delete Car?",
      text: `Are you sure you want to delete "${carName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/admin/cars/${carId}`);
        toast.success("Car deleted successfully");
        fetchAllCars();
      } catch (error) {
        console.error("Error deleting car:", error);
        toast.error("Failed to delete car");
      }
    }
  };

  const filteredCars = cars.filter((car) => {
    if (!searchTerm.trim()) return true;
    const lowerQuery = searchTerm.toLowerCase();
    const ownerName =
      typeof car.addedBy === "object" ? car.addedBy?.displayName : car.addedBy;
    const carName = car.carName || car.carModel;
    return (
      carName?.toLowerCase().includes(lowerQuery) ||
      car.category?.toLowerCase().includes(lowerQuery) ||
      car.location?.toLowerCase().includes(lowerQuery) ||
      car.providerName?.toLowerCase().includes(lowerQuery) ||
      ownerName?.toLowerCase().includes(lowerQuery)
    );
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <HiViewGrid className="text-4xl" />
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            All Cars
          </h1>
        </div>
        <p className="text-base md:text-lg font-body opacity-90">
          Manage all car listings on the platform
        </p>
        <div className="mt-4 flex items-center gap-6">
          <div>
            <p className="text-sm opacity-75">Total Cars</p>
            <p className="text-2xl font-heading font-bold">{cars.length}</p>
          </div>
          <div>
            <p className="text-sm opacity-75">Available</p>
            <p className="text-2xl font-heading font-bold">
              {
                cars.filter(
                  (c) =>
                    c.status === "Available" || c.availability === "available"
                ).length
              }
            </p>
          </div>
          <div>
            <p className="text-sm opacity-75">Unavailable</p>
            <p className="text-2xl font-heading font-bold">
              {
                cars.filter(
                  (c) =>
                    c.status === "Unavailable" ||
                    c.availability === "unavailable"
                ).length
              }
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-base-100 rounded-2xl p-4 md:p-6 shadow-lg border-2 border-base-300">
        <div className="relative">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-medium h-5 w-5" />
          <input
            type="text"
            placeholder="Search by car model, category, location, or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-12 font-body"
          />
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div
            key={car._id}
            className="bg-base-100 rounded-2xl shadow-lg border-2 border-base-300 overflow-hidden hover:shadow-xl hover:border-primary transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48">
              <img
                src={
                  car.imageURL ||
                  car.imageUrl ||
                  "https://placehold.co/400x300/1e40af/ffffff?text=No+Image"
                }
                alt={car.carName || car.carModel || "Car"}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                {car.status === "Available" ||
                car.availability === "available" ? (
                  <span className="badge badge-accent text-white font-semibold shadow-lg">
                    Available
                  </span>
                ) : (
                  <span className="badge badge-error text-white font-semibold shadow-lg">
                    Unavailable
                  </span>
                )}
              </div>
              <div className="absolute top-3 left-3">
                <span className="badge badge-primary text-white font-semibold shadow-lg">
                  {car.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Title */}
              <div>
                <h3 className="text-xl font-heading font-bold text-neutral mb-1">
                  {car.carName || car.carModel || "Unknown Car"}
                </h3>
                <p className="text-sm text-neutral-medium font-body">
                  {car.category || "N/A"}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-2">
                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-neutral-medium">
                  <FaMapMarkerAlt className="text-primary" />
                  <span className="font-body">
                    {car.location || "Not specified"}
                  </span>
                </div>

                {/* Owner */}
                <div className="flex items-center gap-2 text-sm text-neutral-medium">
                  <FaUser className="text-secondary" />
                  <span className="font-body">
                    {car.providerName ||
                      (typeof car.addedBy === "object"
                        ? car.addedBy?.displayName
                        : car.addedBy) ||
                      "Unknown"}
                  </span>
                </div>
              </div>

              {/* Price & Bookings */}
              <div className="flex items-center justify-between pt-3 border-t border-base-300">
                <div>
                  <p className="text-xs text-neutral-medium font-body">
                    Price/Day
                  </p>
                  <p className="text-2xl font-heading font-bold text-primary">
                    ৳{car.rentPrice || car.rentalPrice || "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-medium font-body">
                    Bookings
                  </p>
                  <p className="text-2xl font-heading font-bold text-neutral">
                    {car.bookingCount || 0}
                  </p>
                </div>
              </div>

              {/* Description */}
              {car.description && (
                <p className="text-sm text-neutral-medium font-body line-clamp-2">
                  {car.description}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Link
                  to={`/car-details/${car._id}`}
                  className="btn btn-primary btn-sm text-white flex-1"
                >
                  View Details
                </Link>
                <button
                  onClick={() =>
                    handleDelete(car._id, car.carName || car.carModel)
                  }
                  className="btn btn-error btn-sm text-white"
                  title="Delete Car"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCars.length === 0 && (
        <div className="bg-base-100 rounded-2xl p-12 shadow-lg border-2 border-base-300 text-center">
          <HiViewGrid className="mx-auto text-6xl text-neutral-light mb-4" />
          <p className="text-neutral-medium font-body text-lg">
            {searchTerm
              ? "No cars found matching your search"
              : "No cars listed yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllCars;
