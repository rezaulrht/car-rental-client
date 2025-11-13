import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

const SearchFilterBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/browse");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative -mt-20 z-20 px-6 lg:px-10">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border-2 border-base-300 p-6 md:p-8 lg:p-10"
      >
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for cars by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input input-bordered bg-white border-base-300 w-full h-14 lg:h-16 pl-12 lg:pl-14 pr-4 text-neutral font-body text-lg lg:text-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <FaSearch className="absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-neutral-medium text-xl lg:text-2xl" />
          </div>

          <motion.button
            onClick={handleSearch}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(37, 99, 235, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary h-14 lg:h-16 px-8 lg:px-10 text-base lg:text-lg font-body font-semibold text-white border-0"
          >
            <FaSearch className="mr-2" />
            Search
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default SearchFilterBar;
