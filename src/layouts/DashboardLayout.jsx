import React, { useState, use } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  HiMenu,
  HiX,
  HiHome,
  HiViewGrid,
  HiCollection,
  HiPlusCircle,
  HiUser,
  HiLogout,
  HiChevronDown,
  HiUserGroup,
  HiChartBar,
} from "react-icons/hi";
import { FaCar, FaShieldAlt } from "react-icons/fa";
import AuthContext from "../contexts/AuthContext";
import useRole from "../hooks/useRole";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ThemeToggle from "../components/ThemeToggle";

const DashboardLayout = () => {
  const { signOutUser, user } = use(AuthContext);
  const { isAdmin } = useRole();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Log out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            toast.success("Logged out successfully");
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
  };

  // User menu items
  const userMenuItems = [
    {
      name: "Dashboard Home",
      path: "/dashboard",
      icon: HiHome,
      end: true,
    },
    {
      name: "My Bookings",
      path: "/dashboard/my-bookings",
      icon: HiCollection,
    },
    {
      name: "My Reviews",
      path: "/dashboard/my-reviews",
      icon: HiChartBar,
    },
    {
      name: "My Listings",
      path: "/dashboard/my-listings",
      icon: HiViewGrid,
    },
    {
      name: "Add New Car",
      path: "/dashboard/add-car",
      icon: HiPlusCircle,
    },
    {
      name: "My Profile",
      path: "/dashboard/profile",
      icon: HiUser,
    },
  ];

  // Admin menu items
  const adminMenuItems = [
    {
      name: "Admin Dashboard",
      path: "/dashboard/admin",
      icon: HiChartBar,
      end: true,
    },
    {
      name: "Manage Users",
      path: "/dashboard/admin/users",
      icon: HiUserGroup,
    },
    {
      name: "All Cars",
      path: "/dashboard/admin/cars",
      icon: FaCar,
    },
    {
      name: "All Bookings",
      path: "/dashboard/admin/bookings",
      icon: HiCollection,
    },
    {
      name: "All Reviews",
      path: "/dashboard/admin/reviews",
      icon: HiChartBar,
    },
    {
      name: "My Profile",
      path: "/dashboard/profile",
      icon: HiUser,
    },
  ];

  // Choose menu based on role
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Top Navbar */}
      <div className="sticky top-0 z-50 bg-base-100 shadow-md border-b border-base-300">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-ghost btn-square lg:hidden"
          >
            {sidebarOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/logo.png"
              alt="RentWheels Logo"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="text-xl md:text-2xl font-heading font-bold text-neutral">
              Rent<span className="text-primary">Wheels</span>
            </span>
            {isAdmin && (
              <span className="hidden md:inline-flex badge badge-error text-white text-xs font-bold ml-2">
                <FaShieldAlt className="mr-1" />
                ADMIN
              </span>
            )}
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost gap-2 normal-case"
              >
                <div className="avatar">
                  <div className="w-8 md:w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      alt={user?.displayName || "User"}
                      src={user?.photoURL || "https://via.placeholder.com/150"}
                    />
                  </div>
                </div>
                <HiChevronDown className="hidden md:block h-4 w-4" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 md:w-56 p-3 shadow-xl border border-base-300 mt-3"
              >
                <li className="menu-title px-4 py-2 mb-1">
                  <span className="font-semibold text-neutral font-body text-sm md:text-base truncate">
                    {user?.displayName || "User"}
                  </span>
                  <span className="text-xs text-neutral-medium font-body truncate">
                    {user?.email}
                  </span>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className="text-neutral hover:text-primary font-body"
                  >
                    <HiUser className="h-5 w-5" />
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="text-neutral hover:text-primary font-body"
                  >
                    <HiHome className="h-5 w-5" />
                    Dashboard Home
                  </NavLink>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error hover:bg-error/10 font-body"
                  >
                    <HiLogout className="h-5 w-5" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 xl:w-72 bg-base-100 border-r border-base-300 h-[calc(100vh-5rem)] sticky top-20">
          <nav className="p-4 h-full flex flex-col">
            <ul className="menu gap-2 flex-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-body font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-neutral hover:bg-base-200 hover:text-primary"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Logout Button */}
            <div className="mt-4 pt-4 border-t border-base-300">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-body font-medium transition-all duration-200 text-error hover:bg-error/10 w-full"
              >
                <HiLogout className="h-5 w-5" />
                Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed top-0 left-0 w-64 h-full bg-base-100 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-base-300">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setSidebarOpen(false)}
            >
              <img src="/logo.png" alt="RentWheels Logo" className="w-8 h-8" />
              <span className="text-xl font-heading font-bold text-neutral">
                Rent<span className="text-primary">Wheels</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="btn btn-ghost btn-sm btn-square"
            >
              <HiX className="h-5 w-5" />
            </button>
          </div>

          <nav className="p-4 h-[calc(100%-4rem)] flex flex-col">
            <ul className="menu gap-2 flex-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-body font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-neutral hover:bg-base-200 hover:text-primary"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Logout Button */}
            <div className="mt-4 pt-4 border-t border-base-300">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-body font-medium transition-all duration-200 text-error hover:bg-error/10 w-full"
              >
                <HiLogout className="h-5 w-5" />
                Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
