import React from "react";
import { FaMapMarkerAlt, FaUser, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";

const CarsCard = ({ car }) => {
  return (
    <>
      <div className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-primary/30 hover:scale-105 transition-all duration-300 group h-full flex flex-col">
        <div className="relative h-48 lg:h-56 overflow-hidden bg-base-200">
          <img
            src={car?.imageURL || "https://via.placeholder.com/400x300"}
            alt={car?.carName || "Car"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 lg:top-4 right-3 lg:right-4">
            <span
              className={`badge badge-lg lg:badge-xl border-0 font-body font-semibold shadow-lg ${car?.status === "Available"
                ? "bg-accent text-white"
                : "bg-error text-white"
                }`}
              data-tooltip-id={`status-tooltip-${car?._id}`}
              data-tooltip-content={
                car?.status === "Available"
                  ? "This car is ready to book!"
                  : "The car is already booked by someone"
              }
              data-tooltip-place="bottom"
            >
              {car?.status || "Available"}
            </span>
            <Tooltip id={`status-tooltip-${car?._id}`} />
          </div>
          <div className="absolute top-3 lg:top-4 left-3 lg:left-4">
            <span className="badge badge-lg lg:badge-xl bg-base-100 text-neutral border-0 font-body font-medium shadow-lg">
              {car?.category || "Sedan"}
            </span>
          </div>
        </div>

        <div className="p-6 lg:p-8 flex-1 flex flex-col">
          <h3 className="text-xl lg:text-2xl font-heading font-bold text-neutral mb-3 line-clamp-1">
            {car?.carName || "Toyota Camry 2024"}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <FaUser className="text-neutral-medium text-sm lg:text-base" />
            <span className="text-sm lg:text-base text-neutral-medium font-body">
              {car?.providerName || "John Doe"}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <FaMapMarkerAlt className="text-neutral-medium text-sm lg:text-base" />
            <span className="text-sm lg:text-base text-neutral-medium font-body">
              {car?.location || "Dhaka, Bangladesh"}
            </span>
          </div>

          <div className="bg-primary/10 rounded-xl p-4 lg:p-5 mb-4 border border-primary/20 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-sm lg:text-base text-neutral-medium font-body">
                Daily Rate
              </span>
              <div
                className="text-right"
                data-tooltip-id={`price-tooltip-${car?._id}`}
                data-tooltip-content={`Book now for just ৳${car?.rentPrice
                  ? Number(car.rentPrice).toLocaleString()
                  : "5,000"
                  } per day!`}
                data-tooltip-place="bottom"
              >
                <p className="text-2xl lg:text-3xl font-heading font-bold text-primary">
                  ৳
                  {car?.rentPrice
                    ? Number(car.rentPrice).toLocaleString()
                    : "5,000"}
                </p>
                <p className="text-xs lg:text-sm text-neutral-medium font-body">
                  per day
                </p>
              </div>
              <Tooltip id={`price-tooltip-${car?._id}`} />
            </div>
          </div>

          <Link
            to={`/car-details/${car?._id}`}
            className="btn btn-primary w-full h-12 lg:h-14 text-base lg:text-lg font-body font-semibold text-white border-0 hover:scale-105 transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default CarsCard;
