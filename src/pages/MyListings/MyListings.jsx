import React, { useEffect, useState, use } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  FaCar,
  FaCheckCircle,
  FaMoneyBillWave,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import AuthContext from "../../contexts/AuthContext";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";
import UpdateCarModal from "./UpdateCarModal";

const MyListings = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const axios = useAxios();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const fetchMyCars = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const response = await axios.get(`/cars?email=${user.email}`);
      setCars(response.data);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      toast.error("Failed to load your listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "My Listings - RentWheels";
    fetchMyCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleUpdate = (car) => {
    setSelectedCar(car);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedCar(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/cars/${selectedCar._id}`);
      toast.success("Car deleted successfully!");
      setCars(cars.filter((car) => car._id !== selectedCar._id));
      setOpenDeleteModal(false);
      setSelectedCar(null);
    } catch (error) {
      console.error("Failed to delete car:", error);
      toast.error("Failed to delete car. Please try again.");
    }
  };

  const handleOpenDeleteModal = (car) => {
    setSelectedCar(car);
    setOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedCar(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral mb-2">
                My <span className="text-primary">Listings</span>
              </h1>
              <p className="text-base md:text-lg text-neutral-medium font-body">
                Manage your car rental listings
              </p>
            </div>
            <button
              onClick={() => navigate("/add-car")}
              className="btn btn-primary h-12 px-6 text-base font-body font-semibold text-white border-0 hover:scale-105 transition-all duration-300"
            >
              <FaPlus className="text-lg" /> Add New Car
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-base-100 rounded-xl p-6 border-2 border-base-300 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FaCar className="text-2xl text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-neutral">
                    {cars.length}
                  </p>
                  <p className="text-sm text-neutral-medium font-body">
                    Total Listings
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-base-100 rounded-xl p-6 border-2 border-base-300 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-2xl text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-neutral">
                    {cars.length}
                  </p>
                  <p className="text-sm text-neutral-medium font-body">
                    Active Cars
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-base-100 rounded-xl p-6 border-2 border-base-300 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <FaMoneyBillWave className="text-2xl text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-neutral">
                    ৳
                    {cars
                      .reduce((sum, car) => sum + Number(car.rentPrice), 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-neutral-medium font-body">
                    Total Daily Value
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {cars.length === 0 ? (
          <div className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-xl p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCar className="text-6xl text-primary/30" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-neutral mb-3">
                No Listings Yet
              </h3>
              <p className="text-base text-neutral-medium font-body mb-6">
                Start earning by listing your first car on our platform. It's
                quick and easy!
              </p>
              <button
                onClick={() => navigate("/add-car")}
                className="btn btn-primary h-12 px-8 text-base font-body font-semibold text-white border-0 hover:scale-105 transition-all duration-300"
              >
                List Your First Car
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-xl overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-300 group"
              >
                {/* Car Image */}
                <div className="relative h-48 overflow-hidden bg-base-200">
                  <img
                    src={car.imageURL}
                    alt={car.carName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`badge badge-lg border-0 font-body font-semibold shadow-lg ${
                        car.status === "Available"
                          ? "bg-accent text-white"
                          : "bg-error text-white"
                      }`}
                    >
                      {car.status}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-lg bg-base-100 text-neutral border-0 font-body font-medium shadow-lg">
                      {car.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Car Name */}
                  <h3 className="text-xl font-heading font-bold text-neutral mb-2 line-clamp-1">
                    {car.carName}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-medium font-body mb-4 line-clamp-2 leading-relaxed">
                    {car.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4">
                    <FaMapMarkerAlt className="text-neutral-medium" />
                    <span className="text-sm text-neutral-medium font-body">
                      {car.location}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="bg-secondary/10 rounded-xl p-4 mb-4 border border-secondary/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-medium font-body">
                        Daily Rate
                      </span>
                      <div className="text-right">
                        <p className="text-2xl font-heading font-bold text-secondary">
                          ৳{Number(car.rentPrice).toLocaleString()}
                        </p>
                        <p className="text-xs text-neutral-medium font-body">
                          per day
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date Added */}
                  <div className="mb-4 pb-4 border-b border-base-300">
                    <p className="text-xs text-neutral-light font-body">
                      Listed on{" "}
                      {new Date(car.dateAdded).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleUpdate(car)}
                      className="btn btn-outline btn-sm h-10 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white hover:border-secondary font-body font-medium transition-all duration-300"
                    >
                      <FaEdit className="text-base" /> Edit
                    </button>
                    <button
                      onClick={() => handleOpenDeleteModal(car)}
                      className="btn btn-outline btn-sm h-10 border-2 border-error text-error hover:bg-error hover:text-white hover:border-error font-body font-medium transition-all duration-300"
                    >
                      <FaTrashAlt className="text-base" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Update Car Modal */}
      <UpdateCarModal
        car={selectedCar}
        isOpen={openUpdateModal}
        onClose={handleCloseUpdateModal}
        onUpdate={fetchMyCars}
      />

      {/* Delete Confirmation Modal */}
      {openDeleteModal && selectedCar && (
        <dialog open className="modal modal-open">
          <div className="modal-box bg-base-100 border-2 border-base-300 shadow-2xl max-w-md">
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrashAlt className="text-5xl text-error" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-neutral mb-2">
                Delete Listing?
              </h3>
              <p className="text-base text-neutral-medium font-body">
                Are you sure you want to delete this car listing?
              </p>
            </div>

            {/* Car Info */}
            <div className="bg-base-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={selectedCar.imageURL}
                  alt={selectedCar.carName}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-neutral mb-1">
                    {selectedCar.carName}
                  </h4>
                  <p className="text-sm text-neutral-medium font-body">
                    {selectedCar.category} • ৳
                    {Number(selectedCar.rentPrice).toLocaleString()}/day
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-medium font-body text-center mb-6">
              This action cannot be undone. The listing will be permanently
              removed from the platform.
            </p>

            {/* Action Buttons */}
            <div className="modal-action justify-center gap-3">
              <button
                onClick={closeDeleteModal}
                className="btn btn-outline flex-1 h-12 border-2 border-base-300 text-neutral hover:bg-base-200 hover:border-neutral font-body font-medium transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn bg-error hover:bg-error/90 text-white border-0 flex-1 h-12 font-body font-semibold transition-all duration-300"
              >
                <FaTrashAlt className="text-base" /> Delete Listing
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop bg-black/50"
            onClick={closeDeleteModal}
          ></div>
        </dialog>
      )}
    </div>
  );
};

export default MyListings;
