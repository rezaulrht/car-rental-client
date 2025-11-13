import React, { useState, useEffect, use } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiUser,
  HiPhotograph,
} from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import AuthContext from "../../contexts/AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, loginUserwithGoogle, updateUserProfile } =
    use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "Register - RentWheels";
  }, []);

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    return errors;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    if (!password) {
      toast.error("Password is required");
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      passwordErrors.forEach((error) => toast.error(error));
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log("Firebase User:", result.user);
        updateUserProfile(name, photoURL)
          .then(() => {
            toast.success("Registration successful!");
            navigate(`${location.state ? location.state : "/"}`);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    loginUserwithGoogle()
      .then(() => {
        toast.success("Registration successful!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 lg:py-16 px-4 md:px-8 lg:px-10">
      <div className="max-w-md w-full">
        <div className="bg-base-100 rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border border-base-300">
          <div className="text-center mb-6 md:mb-8 lg:mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <img
                src="/logo.png"
                alt="RentWheels Logo"
                className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-neutral">
                Rent<span className="text-primary">Wheels</span>
              </h1>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-neutral mb-2">
              Create Account
            </h2>
            <p className="text-sm lg:text-base text-neutral-medium font-body">
              Sign up to start renting your dream car
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 lg:space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm lg:text-base font-medium text-neutral mb-2 font-body"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 lg:h-6 lg:w-6 text-neutral-light" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="input input-bordered bg-base-100 border-base-300 w-full pl-10 lg:pl-12 h-12 md:h-14 lg:h-16 text-neutral placeholder:text-neutral-light font-body text-base lg:text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral mb-2 font-body"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-neutral-light" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered bg-base-100 border-base-300 w-full pl-10 h-12 md:h-14 text-neutral placeholder:text-neutral-light font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-neutral mb-2 font-body"
              >
                Photo URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiPhotograph className="h-5 w-5 text-neutral-light" />
                </div>
                <input
                  type="url"
                  id="photoURL"
                  name="photoURL"
                  placeholder="Enter your photo URL"
                  className="input input-bordered bg-base-100 border-base-300 w-full pl-10 h-12 md:h-14 text-neutral placeholder:text-neutral-light font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral mb-2 font-body"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-neutral-light" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  className="input input-bordered bg-base-100 border-base-300 w-full pl-10 pr-10 h-12 md:h-14 text-neutral placeholder:text-neutral-light font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5 text-neutral-light hover:text-neutral transition-colors duration-200" />
                  ) : (
                    <HiEye className="h-5 w-5 text-neutral-light hover:text-neutral transition-colors duration-200" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-neutral-medium font-body">
                Must be at least 6 characters long with uppercase and lowercase
                letters
              </p>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-12 md:h-14 text-base md:text-lg font-body font-medium text-white border-0 hover:scale-[1.02] transition-transform duration-200 mt-6"
            >
              Create Account
            </button>
          </form>

          <div className="divider text-neutral-medium text-sm font-body my-6">
            OR
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="btn btn-outline border-2 border-base-300 bg-base-100 hover:bg-base-200 hover:border-base-300 w-full h-12 md:h-14 text-neutral font-body font-medium transition-all duration-200"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="h-5 w-5 text-error" />
              Sign up with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-medium font-body">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary-dark font-semibold transition-colors duration-200"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-medium font-body">
            By signing up, you agree to our{" "}
            <a
              href="#"
              className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
