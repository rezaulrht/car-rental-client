import React, { useEffect, useState } from "react";
import { HiViewGrid, HiSearch, HiFilter } from "react-icons/hi";
import { FaTimes, FaSortAmountDown } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllCars = () => {
  const axios = useAxiosSecure();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const categories = [
    "All Categories",
    "Sedan",
    "SUV",
    "Hatchback",
    "Luxury",
    "Sports",
    "Electric",
    "Convertible",
    "Coupe",
    "Van",
    "Truck",
  ];

  useEffect(() => {
    document.title = "All Cars - RentWheels Admin";
    fetchAllCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/cars");
      console.log("Fetched cars:", response.data);
      setCars(response.data);
      setFilteredCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort logic
  useEffect(() => {
    let result = [...cars];

    // Apply search filter
    if (searchTerm.trim()) {
      const lowerQuery = searchTerm.toLowerCase();
      result = result.filter(
        (car) =>
          car.carModel?.toLowerCase().includes(lowerQuery) ||
          car.brand?.toLowerCase().includes(lowerQuery) ||
          car.category?.toLowerCase().includes(lowerQuery) ||
          car.addedBy?.displayName?.toLowerCase().includes(lowerQuery) ||
          car.addedBy?.email?.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (car) => car.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply availability filter
    if (selectedAvailability !== "all") {
      result = result.filter(
        (car) => car.availability === selectedAvailability
      );
    }

    // Apply price range filter
    if (priceRange.min) {
      result = result.filter(
        (car) => (car.rentalPrice || 0) >= parseInt(priceRange.min)
      );
    }
    if (priceRange.max) {
      result = result.filter(
        (car) => (car.rentalPrice || 0) <= parseInt(priceRange.max)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.rentalPrice || 0) - (b.rentalPrice || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.rentalPrice || 0) - (a.rentalPrice || 0));
        break;
      case "bookings-high":
        result.sort((a, b) => (b.bookingCount || 0) - (a.bookingCount || 0));
        break;
      case "bookings-low":
        result.sort((a, b) => (a.bookingCount || 0) - (b.bookingCount || 0));
        break;
      case "date-new":
        result.sort(
          (a, b) =>
            new Date(b.registrationDate || 0) -
            new Date(a.registrationDate || 0)
        );
        break;
      case "date-old":
        result.sort(
          (a, b) =>
            new Date(a.registrationDate || 0) -
            new Date(b.registrationDate || 0)
        );
        break;
      default:
        break;
    }

    setFilteredCars(result);
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategory,
    selectedAvailability,
    priceRange,
    sortBy,
    cars,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedAvailability("all");
    setPriceRange({ min: "", max: "" });
    setSortBy("default");
  };

  const handleDelete = async (carId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the car listing",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
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
              <HiViewGrid className="inline mr-3 text-primary" />
              All Cars
            </h1>
            <p className="text-base text-neutral-medium font-body">
              Manage all car listings on the platform
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-medium font-body">Total Cars</p>
            <p className="text-3xl font-heading font-bold text-primary">
              {cars.length}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-6 mb-6">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-medium h-5 w-5" />
          <input
            type="text"
            placeholder="Search by car, brand, category, or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-12 font-body"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-medium hover:text-error transition-colors"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Category Filter */}
          <div>
            <label className="label">
              <span className="label-text font-body text-neutral flex items-center gap-2">
                <HiFilter /> Category
              </span>
            </label>
            <select
              value={
                selectedCategory === "all"
                  ? "All Categories"
                  : selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
              }
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value.toLowerCase().replace(" categories", "")
                )
              }
              className="select select-bordered w-full font-body"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="label">
              <span className="label-text font-body text-neutral">
                Availability
              </span>
            </label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="select select-bordered w-full font-body"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          {/* Min Price Filter */}
          <div>
            <label className="label">
              <span className="label-text font-body text-neutral">
                Min Price (৳)
              </span>
            </label>
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, min: e.target.value }))
              }
              className="input input-bordered w-full font-body"
              min="0"
            />
          </div>

          {/* Max Price Filter */}
          <div>
            <label className="label">
              <span className="label-text font-body text-neutral">
                Max Price (৳)
              </span>
            </label>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, max: e.target.value }))
              }
              className="input input-bordered w-full font-body"
              min="0"
            />
          </div>

          {/* Sort Filter */}
          <div>
            <label className="label">
              <span className="label-text font-body text-neutral flex items-center gap-2">
                <FaSortAmountDown /> Sort By
              </span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered w-full font-body"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="bookings-high">Most Booked</option>
              <option value="bookings-low">Least Booked</option>
              <option value="date-new">Newest First</option>
              <option value="date-old">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Active Filters & Clear Button */}
        {(searchTerm ||
          selectedCategory !== "all" ||
          selectedAvailability !== "all" ||
          priceRange.min ||
          priceRange.max ||
          sortBy !== "default") && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-neutral-medium font-body">
              Active Filters:
            </span>
            {searchTerm && (
              <span className="badge badge-primary gap-2">
                Search: {searchTerm}
                <FaTimes
                  className="cursor-pointer"
                  onClick={() => setSearchTerm("")}
                />
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="badge badge-secondary gap-2">
                {selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)}
                <FaTimes
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory("all")}
                />
              </span>
            )}
            {selectedAvailability !== "all" && (
              <span className="badge badge-accent gap-2">
                {selectedAvailability.charAt(0).toUpperCase() +
                  selectedAvailability.slice(1)}
                <FaTimes
                  className="cursor-pointer"
                  onClick={() => setSelectedAvailability("all")}
                />
              </span>
            )}
            {priceRange.min && (
              <span className="badge badge-accent gap-2">
                Min: ৳{priceRange.min}
                <FaTimes
                  className="cursor-pointer"
                  onClick={() =>
                    setPriceRange((prev) => ({ ...prev, min: "" }))
                  }
                />
              </span>
            )}
            {priceRange.max && (
              <span className="badge badge-accent gap-2">
                Max: ৳{priceRange.max}
                <FaTimes
                  className="cursor-pointer"
                  onClick={() =>
                    setPriceRange((prev) => ({ ...prev, max: "" }))
                  }
                />
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="btn btn-sm btn-outline btn-error gap-2 ml-auto"
            >
              <FaTimes /> Clear All
            </button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold text-neutral">
          Car Listings
        </h2>
        <span className="text-sm text-neutral-medium font-body">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredCars.length)} of{" "}
          {filteredCars.length} cars
        </span>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCars.map((car) => (
          <div
            key={car._id}
            className="bg-base-100 rounded-xl shadow-lg border-2 border-base-300 overflow-hidden hover:shadow-xl hover:border-primary transition-all duration-300"
          >
            <div className="relative">
              <img
                src={
                  car.imageUrl ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={car.carModel || "Car"}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 badge badge-primary text-white font-semibold">
                {car.category || "Unknown"}
              </div>
              {car.availability === "unavailable" && (
                <div className="absolute top-2 left-2 badge badge-error text-white font-semibold">
                  Unavailable
                </div>
              )}
              {car.availability === "available" && (
                <div className="absolute top-2 left-2 badge badge-accent text-white font-semibold">
                  Available
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              {/* Car Name & Brand */}
              <div>
                <h3 className="text-lg font-heading font-bold text-neutral line-clamp-1">
                  {car.carModel || "Unknown Car"}
                </h3>
                <p className="text-sm text-neutral-medium font-body">
                  {car.brand || "Unknown Brand"}
                </p>
              </div>

              {/* Location */}
              {car.location && (
                <div className="flex items-center gap-2 text-sm text-neutral-medium">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-body">{car.location}</span>
                </div>
              )}

              {/* Owner Info */}
              <div className="bg-base-200 rounded-lg p-2">
                <p className="text-xs text-neutral-medium font-body mb-1">
                  Owner
                </p>
                <p className="text-sm font-body font-semibold text-neutral line-clamp-1">
                  {car.addedBy?.displayName || car.providerName || "Unknown"}
                </p>
                <p className="text-xs text-neutral-medium font-body line-clamp-1">
                  {car.addedBy?.email || car.providerEmail || "N/A"}
                </p>
              </div>

              {/* Price & Bookings */}
              <div className="flex items-center justify-between pt-2 border-t border-base-300">
                <div>
                  <p className="text-2xl font-heading font-bold text-primary">
                    ৳{car.rentalPrice || 0}
                  </p>
                  <p className="text-xs text-neutral-medium font-body">
                    per day
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-heading font-bold text-neutral">
                    {car.bookingCount || 0}
                  </p>
                  <p className="text-xs text-neutral-medium font-body">
                    bookings
                  </p>
                </div>
              </div>

              {/* Date Added */}
              {car.registrationDate && (
                <p className="text-xs text-neutral-medium font-body text-center">
                  Added: {new Date(car.registrationDate).toLocaleDateString()}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Link
                  to={`/car/${car._id}`}
                  className="btn btn-primary btn-sm text-white flex-1"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="btn btn-error btn-sm text-white"
                  title="Delete Car"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-outline btn-primary"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`btn ${
                  currentPage === index + 1
                    ? "btn-primary text-white"
                    : "btn-outline"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn btn-outline btn-primary"
          >
            Next
          </button>
        </div>
      )}

      {filteredCars.length === 0 && (
        <div className="bg-base-100 rounded-2xl p-12 shadow-lg border-2 border-base-300 text-center">
          <HiViewGrid className="mx-auto text-6xl text-neutral-light mb-4" />
          <p className="text-neutral-medium font-body mb-4">
            {searchTerm ||
            selectedCategory !== "all" ||
            selectedAvailability !== "all" ||
            priceRange.min ||
            priceRange.max
              ? "No cars found matching your filters"
              : "No cars listed yet"}
          </p>
          {(searchTerm ||
            selectedCategory !== "all" ||
            selectedAvailability !== "all" ||
            priceRange.min ||
            priceRange.max) && (
            <button
              onClick={handleClearFilters}
              className="btn btn-primary gap-2"
            >
              <FaTimes /> Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCars;
