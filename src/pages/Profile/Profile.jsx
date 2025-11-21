import React, { useEffect, useState, use } from "react";
import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCar,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaEdit,
  FaCamera,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import AuthContext from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import auth from "../../firebase/firebase.config";

const Profile = () => {
  const { user, setUser } = use(AuthContext);
  const axios = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalListings: 0,
    totalSpent: 0,
    totalEarnings: 0, // Potential future feature
    listingsValue: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });

  useEffect(() => {
    document.title = "My Profile - RentWheels";
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch User's Listings
      const carsResponse = await axios.get(`/cars?uid=${user.uid}`);
      const myCars = carsResponse.data;
      
      // Fetch User's Bookings
      const bookingsResponse = await axios.get(`/bookings?renterId=${user.uid}`);
      const myBookings = bookingsResponse.data;

      // Calculate Stats
      const totalListings = myCars.length;
      const listingsValue = myCars.reduce((sum, car) => sum + Number(car.rentPrice), 0);
      
      const totalBookings = myBookings.length;
      const totalSpent = myBookings.reduce((sum, booking) => sum + Number(booking.totalPrice), 0);

      setStats({
        totalBookings,
        totalListings,
        totalSpent,
        listingsValue,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to load profile stats");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      // Update in database
      await axios.patch(`/users/${user.uid}`, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });
      
      // Update local state
      setUser({ ...user, displayName: formData.displayName, photoURL: formData.photoURL });
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-12 lg:py-16 px-4 md:px-8 lg:px-10 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-xl overflow-hidden sticky top-24">
              <div className="bg-primary/10 h-32 relative">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full ring-4 ring-base-100 overflow-hidden bg-base-200">
                      <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt={user?.displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg cursor-pointer">
                        <FaCamera className="text-xs" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-16 pb-8 px-6 text-center">
                {!isEditing ? (
                  <>
                    <h2 className="text-2xl font-heading font-bold text-neutral mb-1">
                      {user?.displayName || "User Name"}
                    </h2>
                    <p className="text-neutral-medium font-body flex items-center justify-center gap-2 mb-6">
                      <FaEnvelope className="text-sm" />
                      {user?.email}
                    </p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-outline btn-primary btn-sm rounded-full px-6 font-body"
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-xs font-bold">Display Name</span>
                      </label>
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        className="input input-sm input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-xs font-bold">Photo URL</span>
                      </label>
                      <input
                        type="url"
                        value={formData.photoURL}
                        onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                        className="input input-sm input-bordered w-full"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="flex gap-2 justify-center mt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn btn-ghost btn-sm text-error"
                      >
                        <FaTimes /> Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm text-white"
                      >
                        <FaSave /> Save
                      </button>
                    </div>
                  </form>
                )}

                <div className="divider my-6"></div>

                <div className="text-left space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-medium">Member Since</span>
                    <span className="font-semibold text-neutral">
                      {user?.metadata?.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-medium">Last Login</span>
                    <span className="font-semibold text-neutral">
                      {user?.metadata?.lastSignInTime
                        ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats & Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-2xl font-heading font-bold text-neutral">Dashboard Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Total Bookings */}
              <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FaCalendarAlt className="text-2xl text-primary" />
                  </div>
                  <Link to="/my-bookings" className="text-xs font-bold text-primary hover:underline">
                    View All
                  </Link>
                </div>
                <p className="text-neutral-medium text-sm font-body">Total Bookings</p>
                <h4 className="text-3xl font-heading font-bold text-neutral">{stats.totalBookings}</h4>
              </div>

              {/* Total Spent */}
              <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <FaMoneyBillWave className="text-2xl text-secondary" />
                  </div>
                  <span className="text-xs font-bold text-secondary">Lifetime</span>
                </div>
                <p className="text-neutral-medium text-sm font-body">Total Spent</p>
                <h4 className="text-3xl font-heading font-bold text-neutral">৳{stats.totalSpent.toLocaleString()}</h4>
              </div>

              {/* My Listings */}
              <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <FaCar className="text-2xl text-accent" />
                  </div>
                  <Link to="/my-listings" className="text-xs font-bold text-accent hover:underline">
                    Manage
                  </Link>
                </div>
                <p className="text-neutral-medium text-sm font-body">My Listings</p>
                <h4 className="text-3xl font-heading font-bold text-neutral">{stats.totalListings}</h4>
              </div>

              {/* Listings Value */}
              <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-neutral/10 rounded-xl flex items-center justify-center">
                    <FaMoneyBillWave className="text-2xl text-neutral" />
                  </div>
                  <span className="text-xs font-bold text-neutral">Daily Potential</span>
                </div>
                <p className="text-neutral-medium text-sm font-body">Listings Value</p>
                <h4 className="text-3xl font-heading font-bold text-neutral">৳{stats.listingsValue.toLocaleString()}</h4>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-6">
              <h4 className="text-lg font-heading font-bold text-neutral mb-4">Quick Actions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  to="/browse" 
                  className="btn btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-neutral justify-start normal-case h-auto py-3"
                >
                  <div className="text-left">
                    <div className="font-bold">Browse Cars</div>
                    <div className="text-xs font-normal opacity-70">Find your next ride</div>
                  </div>
                </Link>
                <Link 
                  to="/add-car" 
                  className="btn btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-neutral justify-start normal-case h-auto py-3"
                >
                  <div className="text-left">
                    <div className="font-bold">List a Car</div>
                    <div className="text-xs font-normal opacity-70">Earn money with your vehicle</div>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
