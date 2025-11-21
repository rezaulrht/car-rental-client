import React, { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { HiMenu } from "react-icons/hi";
import AuthContext from "../contexts/AuthContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { signOutUser, user, loading } = use(AuthContext);
  const navigate = useNavigate();

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

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-neutral hover:text-primary hover:bg-base-200 font-body text-base font-medium transition-all duration-200 rounded-lg px-4 py-3 ${isActive ? "text-primary font-semibold" : ""
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/browse"
          className={({ isActive }) =>
            `text-neutral hover:text-primary hover:bg-base-200 font-body text-base font-medium transition-all duration-200 rounded-lg px-4 py-3 ${isActive ? "text-primary font-semibold" : ""
            }`
          }
        >
          Browse Cars
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/add-car"
              className={({ isActive }) =>
                `text-neutral hover:text-primary hover:bg-base-200 font-body text-base font-medium transition-all duration-200 rounded-lg px-4 py-3 ${isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              Add Car
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-listings"
              className={({ isActive }) =>
                `text-neutral hover:text-primary hover:bg-base-200 font-body text-base font-medium transition-all duration-200 rounded-lg px-4 py-3 ${isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              My Listings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                `text-neutral hover:text-primary hover:bg-base-200 font-body text-base font-medium transition-all duration-200 rounded-lg px-4 py-3 ${isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              My Bookings
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-base-100 shadow-md border-b border-base-300 h-16 md:h-20 px-3 md:px-6 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden p-1.5 md:p-2"
            >
              <HiMenu className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-1 mt-3 w-52 p-2 shadow-xl border border-base-300"
            >
              {links}

              {user && (
                <>
                  <div className="divider my-1"></div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-error hover:bg-error/10 font-body text-sm md:text-base py-3"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              )}

              {!user && (
                <li className="mt-2">
                  <Link
                    to="/login"
                    className="btn btn-primary btn-sm rounded-full px-5 text-white hover:scale-105 transition-transform duration-300 border-0"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <Link
            to="/"
            className="btn btn-ghost text-base md:text-xl lg:text-2xl font-heading font-bold hover:scale-105 transition-transform duration-300 normal-case px-2 md:px-4"
          >
            <img
              src="/logo.png"
              alt="RentWheels Logo"
              className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 mr-1"
            />
            <span className="text-neutral">
              Rent<span className="text-primary">Wheels</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>

        <div className="navbar-end">
          <ThemeToggle />
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner loading-sm md:loading-md text-primary"></span>
            </div>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 md:w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt={user?.displayName || "User avatar"}
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                  />
                </div>
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
                    to="/profile"
                    className={({ isActive }) =>
                      `text-neutral hover:text-primary hover:bg-base-200 font-body text-sm md:text-base py-2 ${isActive ? "text-primary font-semibold" : ""
                      }`
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-car"
                    className={({ isActive }) =>
                      `text-neutral hover:text-primary hover:bg-base-200 font-body text-sm md:text-base py-2 ${isActive ? "text-primary font-semibold" : ""
                      }`
                    }
                  >
                    Add Car
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-listings"
                    className={({ isActive }) =>
                      `text-neutral hover:text-primary hover:bg-base-200 font-body text-sm md:text-base py-2 ${isActive ? "text-primary font-semibold" : ""
                      }`
                    }
                  >
                    My Listings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-bookings"
                    className={({ isActive }) =>
                      `text-neutral hover:text-primary hover:bg-base-200 font-body text-sm md:text-base py-2 ${isActive ? "text-primary font-semibold" : ""
                      }`
                    }
                  >
                    My Bookings
                  </NavLink>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error hover:bg-error/10 font-body text-sm md:text-base py-2 font-medium"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary btn-sm h-9 md:h-10 lg:h-12 rounded-full px-4 md:px-5 lg:px-8 text-white font-body font-medium text-xs md:text-sm lg:text-base border-0 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
