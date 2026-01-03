import React, { useEffect, useState, use } from "react";
import { Link } from "react-router";
import {
  HiCollection,
  HiViewGrid,
  HiCurrencyDollar,
  HiTrendingUp,
  HiPlusCircle,
} from "react-icons/hi";
import { FaCar, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AuthContext from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const DashboardHome = () => {
  const { user } = use(AuthContext);
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalListings: 0,
    totalSpent: 0,
    totalEarnings: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentListings, setRecentListings] = useState([]);
  const [chartData, setChartData] = useState({
    bookingsOverTime: [],
    carsByCategory: [],
  });

  useEffect(() => {
    document.title = "Dashboard - RentWheels";
    if (user) {
      fetchDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch User's Listings
      const carsResponse = await axios.get(`/cars?uid=${user.uid}`);
      const myCars = carsResponse.data;

      // Fetch User's Bookings
      const bookingsResponse = await axios.get(
        `/bookings?renterId=${user.uid}`
      );
      const myBookings = bookingsResponse.data;

      // Fetch bookings with car details
      const bookingsWithCarDetails = await Promise.all(
        myBookings.slice(0, 5).map(async (booking) => {
          try {
            const carResponse = await axios.get(`/cars/${booking.carId}`);
            return {
              ...booking,
              carDetails: carResponse.data,
            };
          } catch (err) {
            console.error("Error fetching car details:", err);
            return booking;
          }
        })
      );

      // Calculate Stats
      const totalListings = myCars.length;
      const totalBookings = myBookings.length;
      const totalSpent = myBookings.reduce(
        (sum, booking) => sum + Number(booking.totalPrice || 0),
        0
      );

      // Fetch User's Earnings
      let totalEarnings = 0;
      try {
        const earningsResponse = await axios.get(`/users/${user.uid}/earnings`);
        totalEarnings = earningsResponse.data.totalEarnings || 0;
      } catch (err) {
        console.log("Earnings endpoint not available:", err.message);
        // Calculate from bookings on user's cars
        totalEarnings = 0; // Will be implemented when backend supports it
      }

      setStats({
        totalBookings,
        totalListings,
        totalSpent,
        totalEarnings,
      });

      setRecentBookings(bookingsWithCarDetails);
      setRecentListings(myCars.slice(0, 5));

      // Prepare Chart Data
      prepareChartData(myBookings, myCars);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const prepareChartData = (bookings, cars) => {
    // Bookings Over Time (Last 6 months)
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentDate = new Date();
    const bookingsOverTime = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

      const monthBookings = bookings.filter((booking) => {
        const bookingDate = new Date(booking.bookingDate);
        return (
          bookingDate.getMonth() === date.getMonth() &&
          bookingDate.getFullYear() === date.getFullYear()
        );
      });

      const monthRevenue = monthBookings.reduce(
        (sum, booking) => sum + Number(booking.totalPrice || 0),
        0
      );

      bookingsOverTime.push({
        month: monthYear,
        bookings: monthBookings.length,
        revenue: monthRevenue,
      });
    }

    // Cars by Category
    const categoryMap = {};
    cars.forEach((car) => {
      const category = car.category || "Other";
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    const carsByCategory = Object.keys(categoryMap).map((category) => ({
      name: category,
      value: categoryMap[category],
    }));

    setChartData({
      bookingsOverTime,
      carsByCategory,
    });
  };

  if (loading) {
    return <Loader />;
  }

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: HiCollection,
      color: "text-primary",
      bgColor: "bg-primary/10",
      link: "/dashboard/my-bookings",
    },
    {
      title: "My Listings",
      value: stats.totalListings,
      icon: HiViewGrid,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      link: "/dashboard/my-listings",
    },
    {
      title: "Total Spent",
      value: `৳${stats.totalSpent.toLocaleString()}`,
      icon: HiCurrencyDollar,
      color: "text-error",
      bgColor: "bg-error/10",
      link: "/dashboard/my-bookings",
    },
    {
      title: "Total Earnings",
      value: `৳${stats.totalEarnings.toLocaleString()}`,
      icon: HiTrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
      link: "/dashboard/my-listings",
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-6 md:p-8 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
          Welcome back, {user?.displayName?.split(" ")[0] || "User"}! 👋
        </h1>
        <p className="text-base md:text-lg font-body opacity-90">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-base-100 rounded-xl p-6 shadow-lg border-2 border-base-300 hover:border-primary hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-sm font-body text-neutral-medium mb-1">
              {stat.title}
            </h3>
            <p className="text-2xl md:text-3xl font-heading font-bold text-neutral">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
        <h2 className="text-2xl font-heading font-bold text-neutral mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/dashboard/add-car"
            className="btn btn-primary btn-lg text-white gap-2"
          >
            <HiPlusCircle className="h-6 w-6" />
            Add New Car
          </Link>
          <Link
            to="/dashboard/my-bookings"
            className="btn btn-outline btn-lg gap-2"
          >
            <HiCollection className="h-6 w-6" />
            View Bookings
          </Link>
          <Link
            to="/dashboard/my-listings"
            className="btn btn-outline btn-lg gap-2"
          >
            <HiViewGrid className="h-6 w-6" />
            Manage Listings
          </Link>
        </div>
      </div>

      {/* Charts Section */}
      {(chartData.bookingsOverTime.length > 0 ||
        chartData.carsByCategory.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Bookings Over Time Chart */}
          {chartData.bookingsOverTime.length > 0 && (
            <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
              <h2 className="text-2xl font-heading font-bold text-neutral mb-6">
                Bookings Over Time
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.bookingsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-base-100)",
                      border: "1px solid var(--color-base-300)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="bookings"
                    fill="hsl(var(--p))"
                    name="Bookings"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Cars by Category Chart */}
          {chartData.carsByCategory.length > 0 && (
            <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
              <h2 className="text-2xl font-heading font-bold text-neutral mb-6">
                Cars by Category
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData.carsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.carsByCategory.map((entry, index) => {
                      const colors = [
                        "hsl(var(--p))",
                        "hsl(var(--s))",
                        "hsl(var(--a))",
                        "hsl(var(--er))",
                        "hsl(var(--in))",
                        "hsl(var(--wa))",
                      ];
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-base-100)",
                      border: "1px solid var(--color-base-300)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Recent Bookings */}
      {recentBookings.length > 0 && (
        <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-neutral">
              Recent Bookings
            </h2>
            <Link
              to="/dashboard/my-bookings"
              className="text-primary hover:text-primary-dark font-body font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="border-base-300">
                  <th className="font-heading text-neutral">Car</th>
                  <th className="font-heading text-neutral">Date</th>
                  <th className="font-heading text-neutral">Location</th>
                  <th className="font-heading text-neutral">Price</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-base-300 hover:bg-base-200"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-lg">
                            <img
                              src={
                                booking.carDetails?.imageURL ||
                                "https://via.placeholder.com/150"
                              }
                              alt={booking.carDetails?.carName || "Car"}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-body font-semibold text-neutral">
                            {booking.carDetails?.carName || "Car"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="font-body text-neutral-medium text-sm">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td>
                      <p className="font-body text-neutral-medium text-sm">
                        {booking.carDetails?.location || "N/A"}
                      </p>
                    </td>
                    <td>
                      <p className="font-body font-semibold text-primary">
                        ৳{Number(booking.totalPrice).toLocaleString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Listings */}
      {recentListings.length > 0 && (
        <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-neutral">
              My Recent Listings
            </h2>
            <Link
              to="/dashboard/my-listings"
              className="text-primary hover:text-primary-dark font-body font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentListings.map((car) => (
              <div
                key={car._id}
                className="bg-base-200 rounded-xl p-4 border border-base-300 hover:border-primary transition-all duration-300"
              >
                <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                  <img
                    src={car.imageURL || "https://via.placeholder.com/400x300"}
                    alt={car.carName}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-2 right-2 badge ${
                      car.status === "Available"
                        ? "badge-accent"
                        : "badge-error"
                    } text-white`}
                  >
                    {car.status}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-neutral mb-2 line-clamp-1">
                  {car.carName}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-neutral-medium">
                    {car.category}
                  </span>
                  <span className="text-lg font-heading font-bold text-primary">
                    ৳{Number(car.rentPrice).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {recentBookings.length === 0 && recentListings.length === 0 && (
        <div className="bg-base-100 rounded-2xl p-12 shadow-lg border-2 border-base-300 text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCar className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-neutral mb-3">
            Get Started!
          </h3>
          <p className="text-base text-neutral-medium font-body mb-6 max-w-md mx-auto">
            You haven't added any cars or made any bookings yet. Start by adding
            your first car or browse available cars to book.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/dashboard/add-car"
              className="btn btn-primary text-white"
            >
              <HiPlusCircle className="h-5 w-5" />
              Add Your First Car
            </Link>
            <Link to="/browse" className="btn btn-outline">
              Browse Cars
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
