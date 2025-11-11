import React from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";

const CarsCard = ({ car }) => {
  return (
    <div className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-xl overflow-hidden hover:shadow-2xl hover:border-primary/30 hover:scale-105 transition-all duration-300 group h-full flex flex-col">
      {/* Car Image */}
      <div className="relative h-48 overflow-hidden bg-base-200">
        <img
          src={car?.imageURL || "https://via.placeholder.com/400x300"}
          alt={car?.carName || "Car"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`badge badge-lg border-0 font-body font-semibold shadow-lg ${
              car?.status === "Available"
                ? "bg-accent text-white"
                : "bg-error text-white"
            }`}
          >
            {car?.status || "Available"}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="badge badge-lg bg-base-100 text-neutral border-0 font-body font-medium shadow-lg">
            {car?.category || "Sedan"}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Car Name */}
        <h3 className="text-xl font-heading font-bold text-neutral mb-3 line-clamp-1">
          {car?.carName || "Toyota Camry 2024"}
        </h3>

        {/* Provider Info */}
        <div className="flex items-center gap-2 mb-2">
          <FaUser className="text-neutral-medium text-sm" />
          <span className="text-sm text-neutral-medium font-body">
            {car?.providerName || "John Doe"}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4">
          <FaMapMarkerAlt className="text-neutral-medium text-sm" />
          <span className="text-sm text-neutral-medium font-body">
            {car?.location || "Dhaka, Bangladesh"}
          </span>
        </div>

        {/* Price */}
        <div className="bg-primary/10 rounded-xl p-4 mb-4 border border-primary/20 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-medium font-body">
              Daily Rate
            </span>
            <div className="text-right">
              <p className="text-2xl font-heading font-bold text-primary">
                ৳
                {car?.rentPrice
                  ? Number(car.rentPrice).toLocaleString()
                  : "5,000"}
              </p>
              <p className="text-xs text-neutral-medium font-body">per day</p>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <button className="btn btn-primary w-full h-12 text-base font-body font-semibold text-white border-0 hover:scale-105 transition-all duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CarsCard;
