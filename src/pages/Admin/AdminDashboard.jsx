import React, { useEffect, useState } from "react";
import {
  HiUserGroup,
  HiViewGrid,
  HiCollection,
  HiCurrencyDollar,
} from "react-icons/hi";
import { Link } from "react-router";
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
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const axios = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
    totalRevenue: 0,
    availableCars: 0,
    bookedCars: 0,
    carsByCategory: [],
  });

  useEffect(() => {
    document.title = "Admin Dashboard - RentWheels";
    fetchPlatformStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPlatformStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching platform stats:", error);
      toast.error("Failed to load platform statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: HiUserGroup,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      link: "/dashboard/admin/users",
    },
    {
      title: "Total Cars",
      value: stats.totalCars,
      icon: HiViewGrid,
      color: "text-primary",
      bgColor: "bg-primary/10",
      link: "/dashboard/admin/cars",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: HiCollection,
      color: "text-accent",
      bgColor: "bg-accent/10",
      link: "/dashboard/admin/bookings",
    },
    {
      title: "Total Revenue",
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      icon: HiCurrencyDollar,
      color: "text-accent",
      bgColor: "bg-accent/10",
      link: "/dashboard/admin/bookings",
    },
  ];

  const COLORS = [
    "hsl(var(--p))",
    "hsl(var(--s))",
    "hsl(var(--a))",
    "hsl(var(--er))",
    "hsl(var(--in))",
    "hsl(var(--wa))",
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            Admin Dashboard 👑
          </h1>
        </div>
        <p className="text-base md:text-lg font-body opacity-90">
          Platform-wide statistics and management
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

      {/* Car Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
          <h2 className="text-2xl font-heading font-bold text-neutral mb-4">
            Car Availability
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 text-center">
              <p className="text-sm text-neutral-medium font-body mb-2">
                Available
              </p>
              <p className="text-3xl font-heading font-bold text-accent">
                {stats.availableCars}
              </p>
            </div>
            <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 text-center">
              <p className="text-sm text-neutral-medium font-body mb-2">
                Booked
              </p>
              <p className="text-3xl font-heading font-bold text-secondary">
                {stats.bookedCars}
              </p>
            </div>
          </div>
        </div>

        {/* Cars by Category */}
        {stats.carsByCategory && stats.carsByCategory.length > 0 && (
          <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
            <h2 className="text-2xl font-heading font-bold text-neutral mb-6">
              Cars by Category
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.carsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.carsByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
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

      {/* Quick Actions */}
      <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
        <h2 className="text-2xl font-heading font-bold text-neutral mb-4">
          Admin Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/dashboard/admin/users"
            className="btn btn-primary btn-lg text-white gap-2"
          >
            <HiUserGroup className="h-6 w-6" />
            Manage Users
          </Link>
          <Link
            to="/dashboard/admin/cars"
            className="btn btn-outline btn-lg gap-2"
          >
            <HiViewGrid className="h-6 w-6" />
            View All Cars
          </Link>
          <Link
            to="/dashboard/admin/bookings"
            className="btn btn-outline btn-lg gap-2"
          >
            <HiCollection className="h-6 w-6" />
            View All Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
