import React, { useEffect, use, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import AuthContext from "../../contexts/AuthContext";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";

const AddCar = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const axios = useAxios();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Add Car - RentWheels";
  }, []);

  const categories = ["Sedan", "SUV", "Hatchback", "Luxury", "Electric"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      carName: e.target.carName.value,
      description: e.target.description.value,
      category: e.target.category.value,
      rentPrice: e.target.rentPrice.value,
      location: e.target.location.value,
      imageURL: e.target.imageURL.value,
      status: "Available",
      providerId: user?.uid,
      providerName: user?.displayName || "Unknown User",
      providerEmail: user?.email,
      dateAdded: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await axios.post("/cars", carData);
      console.log("Car Data:", carData);
      toast.success("Car added successfully!");
      e.target.reset();
      //   navigate("/my-cars");
    } catch (error) {
      console.error("Failed to add car:", error);
      toast.error("Failed to add car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-4 bg-primary/10 px-6 py-3 rounded-full">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral">
              List Your <span className="text-primary">Vehicle</span>
            </h1>
          </div>
          <p className="text-base md:text-lg text-neutral-medium font-body max-w-2xl mx-auto">
            Join our marketplace and start earning by renting out your car to
            trusted drivers
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="badge badge-lg bg-accent/20 text-accent border-accent/30 font-body">
              Quick & Easy
            </span>
            <span className="badge badge-lg bg-secondary/20 text-secondary border-secondary/30 font-body">
              Verified Platform
            </span>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden">
          {/* Card Header */}
          <div className="bg-linear-to-r from-primary to-primary/80 px-6 md:px-8 py-6">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-white flex items-center gap-3">
              Car Information
            </h2>
            <p className="text-white/90 font-body text-sm mt-1">
              Fill in the details to list your car
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                <h3 className="text-lg font-heading font-semibold text-neutral">
                  Basic Details
                </h3>
              </div>

              {/* Car Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-neutral font-body font-medium">
                    Car Name <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="carName"
                  name="carName"
                  required
                  placeholder="e.g., Toyota Camry 2024"
                  className="input input-bordered bg-base-100 border-base-300 w-full h-14 text-neutral placeholder:text-neutral-light font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:border-primary/50"
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-neutral font-body font-medium">
                    Description <span className="text-error">*</span>
                  </span>
                  <span className="label-text-alt text-neutral-medium font-body">
                    Be detailed and specific
                  </span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows="5"
                  placeholder="Describe your car's features, condition, year, mileage, and any special notes that renters should know..."
                  className="textarea textarea-bordered bg-base-100 border-base-300 w-full text-neutral placeholder:text-neutral-light font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none leading-relaxed transition-all duration-200 hover:border-primary/50"
                ></textarea>
              </div>
            </div>

            {/* Category and Pricing Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-secondary rounded-full"></div>
                <h3 className="text-lg font-heading font-semibold text-neutral">
                  Category & Pricing
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-neutral font-body font-medium">
                      Vehicle Category <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="select select-bordered bg-base-100 border-base-300 w-full h-14 text-neutral font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:border-primary/50"
                  >
                    <option value="" disabled selected>
                      Select vehicle type
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rent Price */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-neutral font-body font-medium">
                      Daily Rental Price <span className="text-error">*</span>
                    </span>
                    <span className="label-text-alt text-neutral-medium font-body">
                      BDT per day
                    </span>
                  </label>
                  <input
                    type="number"
                    id="rentPrice"
                    name="rentPrice"
                    required
                    min="1"
                    step="1"
                    placeholder="5000"
                    className="input input-bordered bg-base-100 border-base-300 w-full h-14 text-neutral placeholder:text-neutral-light font-body font-semibold text-lg focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all duration-200 hover:border-secondary/50"
                  />
                  <label className="label">
                    <span className="label-text-alt text-neutral-medium font-body">
                      Competitive pricing attracts more renters
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Location and Image Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-accent rounded-full"></div>
                <h3 className="text-lg font-heading font-semibold text-neutral">
                  Location & Photos
                </h3>
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-neutral font-body font-medium">
                    Pickup Location <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  placeholder="e.g., Dhaka, Bangladesh"
                  className="input input-bordered bg-base-100 border-base-300 w-full h-14 text-neutral placeholder:text-neutral-light font-body focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-200 hover:border-accent/50"
                />
                <label className="label">
                  <span className="label-text-alt text-neutral-medium font-body">
                    Where renters can pick up the car
                  </span>
                </label>
              </div>

              {/* Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-neutral font-body font-medium">
                    Car Image URL <span className="text-error">*</span>
                  </span>
                  <span className="label-text-alt text-neutral-medium font-body">
                    High quality recommended
                  </span>
                </label>
                <input
                  type="url"
                  id="imageURL"
                  name="imageURL"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  className="input input-bordered bg-base-100 border-base-300 w-full h-14 text-neutral placeholder:text-neutral-light font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:border-primary/50"
                />
                <label className="label">
                  <span className="label-text-alt text-neutral-medium font-body">
                    Use Unsplash, Google Images, or any image hosting service
                  </span>
                </label>
              </div>
            </div>

            {/* Provider Information Section */}
            <div className="bg-linear-to-br from-base-200 to-base-300 rounded-xl p-6 border-2 border-base-300 shadow-inner">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-neutral rounded-full"></div>
                <h3 className="text-lg font-heading font-semibold text-neutral">
                  Provider Information
                </h3>
              </div>
              <p className="text-sm text-neutral-medium font-body mb-4">
                This information is automatically filled from your account
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Provider Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-neutral-medium font-body text-xs font-medium">
                      Provider Name
                    </span>
                  </label>
                  <input
                    type="text"
                    id="providerName"
                    name="providerName"
                    value={user?.displayName || "No Name"}
                    readOnly
                    className="input input-bordered bg-base-300/50 border-base-400 w-full h-12 text-neutral font-body cursor-not-allowed"
                  />
                </div>

                {/* Provider Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-neutral-medium font-body text-xs font-medium">
                      Provider Email
                    </span>
                  </label>
                  <input
                    type="email"
                    id="providerEmail"
                    name="providerEmail"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered bg-base-300/50 border-base-400 w-full h-12 text-neutral font-body cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-base-300">
              <button
                type="submit"
                className="btn btn-primary flex-1 h-14 text-base md:text-lg font-body font-semibold text-white border-0 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
              >
                List My Car
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn btn-outline flex-1 h-14 text-base md:text-lg font-body font-medium border-2 border-base-300 text-neutral hover:bg-base-200 hover:border-neutral transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-medium font-body">
            By listing your car, you agree to our{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Vehicle Listing Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
