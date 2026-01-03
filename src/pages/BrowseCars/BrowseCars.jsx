import React, { useEffect, useState, useRef } from "react";
import { FaSearch, FaTimes, FaFilter, FaSortAmountDown } from "react-icons/fa";
import CarsCard from "../../components/CarsCard";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";
import { useSearchParams } from "react-router";

const BrowseCars = () => {
  const axios = useAxios();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "default");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const searchInputRef = useRef(null);
  const itemsPerPage = 6;

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

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/cars");
      setCars(response.data);
      setFilteredCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort logic
  useEffect(() => {
    let result = [...cars];

    // Apply search filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.carModel.toLowerCase().includes(lowerQuery) ||
          car.brand.toLowerCase().includes(lowerQuery) ||
          car.category.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (car) => car.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply price range filter
    if (priceRange.min) {
      result = result.filter(
        (car) => car.rentalPrice >= parseInt(priceRange.min)
      );
    }
    if (priceRange.max) {
      result = result.filter(
        (car) => car.rentalPrice <= parseInt(priceRange.max)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.rentalPrice - b.rentalPrice);
        break;
      case "price-high":
        result.sort((a, b) => b.rentalPrice - a.rentalPrice);
        break;
      case "date-new":
        result.sort(
          (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
        );
        break;
      case "date-old":
        result.sort(
          (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)
        );
        break;
      default:
        break;
    }

    setFilteredCars(result);
    setCurrentPage(1);

    // Update URL params
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedCategory !== "all") params.category = selectedCategory;
    if (priceRange.min) params.minPrice = priceRange.min;
    if (priceRange.max) params.maxPrice = priceRange.max;
    if (sortBy !== "default") params.sort = sortBy;
    setSearchParams(params);
  }, [
    searchQuery,
    selectedCategory,
    priceRange,
    sortBy,
    cars,
    setSearchParams,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.toLowerCase().replace(" categories", ""));
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({ ...prev, [type]: value }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange({ min: "", max: "" });
    setSortBy("default");
    setSearchParams({});
  };

  useEffect(() => {
    document.title = "Browse Cars - RentWheels";
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen py-16 lg:py-20 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral mb-4">
            Browse <span className="text-primary">Cars</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-medium font-body max-w-2xl mx-auto">
            Explore available cars from trusted providers near you
          </p>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-xl border-2 border-base-300 p-6 lg:p-8 mb-12 lg:mb-16">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for cars by name, brand, or category..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="input input-bordered bg-base-100 border-base-300 w-full h-14 lg:h-16 pl-12 lg:pl-14 pr-12 lg:pr-14 text-neutral placeholder:text-neutral-light font-body text-lg lg:text-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <FaSearch className="absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-neutral-medium text-xl lg:text-2xl" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 lg:right-5 top-1/2 -translate-y-1/2 text-neutral-medium hover:text-error transition-colors"
              >
                <FaTimes className="text-xl lg:text-2xl" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="label">
                <span className="label-text font-body text-neutral flex items-center gap-2">
                  <FaFilter /> Category
                </span>
              </label>
              <select
                value={
                  selectedCategory === "all"
                    ? "All Categories"
                    : selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1)
                }
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="select select-bordered w-full font-body"
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
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
                onChange={(e) => handlePriceChange("min", e.target.value)}
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
                onChange={(e) => handlePriceChange("max", e.target.value)}
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
                onChange={handleSortChange}
                className="select select-bordered w-full font-body"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="date-new">Newest First</option>
                <option value="date-old">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Active Filters & Clear Button */}
          {(searchQuery ||
            selectedCategory !== "all" ||
            priceRange.min ||
            priceRange.max ||
            sortBy !== "default") && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm text-neutral-medium font-body">
                Active Filters:
              </span>
              {searchQuery && (
                <span className="badge badge-primary gap-2">
                  Search: {searchQuery}
                  <FaTimes
                    className="cursor-pointer"
                    onClick={() => setSearchQuery("")}
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
              {priceRange.min && (
                <span className="badge badge-accent gap-2">
                  Min: ৳{priceRange.min}
                  <FaTimes
                    className="cursor-pointer"
                    onClick={() => handlePriceChange("min", "")}
                  />
                </span>
              )}
              {priceRange.max && (
                <span className="badge badge-accent gap-2">
                  Max: ৳{priceRange.max}
                  <FaTimes
                    className="cursor-pointer"
                    onClick={() => handlePriceChange("max", "")}
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

        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-neutral">
                Available <span className="text-primary">Cars</span>
              </h2>
              <span className="text-sm lg:text-base text-neutral-medium font-body">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredCars.length)} of{" "}
                {filteredCars.length} cars
              </span>
            </div>

            {currentCars.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                  {currentCars.map((car) => (
                    <CarsCard key={car._id} car={car} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
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
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-6xl">🚗</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-neutral mb-3">
                  No Cars Found
                </h3>
                <p className="text-base text-neutral-medium font-body mb-6">
                  No cars match your current filters. Try adjusting your search
                  criteria.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn btn-primary gap-2"
                >
                  <FaTimes /> Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
