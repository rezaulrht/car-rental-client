import React, { useEffect, useState, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import CarsCard from "../../components/CarsCard";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";
import { useSearchParams } from "react-router";

const BrowseCars = () => {
  const axios = useAxios();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const searchInputRef = useRef(null);

  const fetchCars = async (query = "") => {
    try {
      setLoading(true);
      const url = query ? `/cars?search=${encodeURIComponent(query)}` : "/cars";
      const response = await axios.get(url);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
      
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        setSearchParams({ search: searchQuery });
        fetchCars(searchQuery);
      } else {
        setSearchParams({});
        fetchCars();
      }
    }, 1000); // 1 sec por load hobe

    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
    fetchCars();
  };

  useEffect(() => {
    document.title = "Browse Cars - RentWheels";
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
      fetchCars(searchParam);
    } else {
      fetchCars();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral mb-4">
            Browse <span className="text-primary">Cars</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-medium font-body max-w-2xl mx-auto">
            Explore available cars from trusted providers near you
          </p>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-xl border-2 border-base-300 p-6 mb-12">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for cars by name..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              className="input input-bordered bg-base-100 border-base-300 w-full h-14 pl-12 pr-12 text-neutral placeholder:text-neutral-light font-body text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-medium text-xl" />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-medium hover:text-error transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-neutral-medium font-body">
                Searching for:{" "}
                <span className="font-semibold text-neutral">
                  {searchQuery}
                </span>
              </span>
              <button
                onClick={handleClearSearch}
                className="text-sm text-primary hover:underline font-body"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {cars.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-heading font-bold text-neutral text-center mb-8">
              Available <span className="text-primary">Cars</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cars.map((car) => (
                <CarsCard key={car._id} car={car} />
              ))}
            </div>
          </div>
        )}

        {cars.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">🚗</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-neutral mb-3">
              {searchQuery ? "No Cars Found" : "No Cars Available Right Now"}
            </h3>
            <p className="text-base text-neutral-medium font-body">
              {searchQuery
                ? `No cars found matching "${searchQuery}". Try a different search term.`
                : "Check back later for new listings from our trusted providers."}
            </p>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="btn btn-primary mt-6"
              >
                Clear Search & View All Cars
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
