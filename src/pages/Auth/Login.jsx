import React, { useState, useEffect, use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { FaGoogle, FaUser, FaUserShield } from "react-icons/fa";
import toast from "react-hot-toast";
import AuthContext from "../../contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoOptions, setShowDemoOptions] = useState(false);
  const { loginUser, loginUserwithGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - RentWheels";
  }, []);

  const handleUserDemo = () => {
    document.getElementById("email").value = "user@user.com";
    document.getElementById("password").value = "@User1234";
    setShowDemoOptions(false);
    toast.success("User demo credentials filled! Click Login to proceed.");
  };

  const handleAdminDemo = () => {
    document.getElementById("email").value = "admin@admin.com";
    document.getElementById("password").value = "@Admin1234";
    setShowDemoOptions(false);
    toast.success("Admin demo credentials filled! Click Login to proceed.");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    loginUserwithGoogle()
      .then(() => {
        toast.success("Login successful!");
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
              Welcome Back!
            </h2>
            <p className="text-sm lg:text-base text-neutral-medium font-body">
              Login to access your account
            </p>
          </div>

          <form
            onSubmit={handleSignIn}
            className="space-y-4 md:space-y-5 lg:space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm lg:text-base font-medium text-neutral mb-2 font-body"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 lg:h-6 lg:w-6 text-neutral-light" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered bg-base-100 border-base-300 w-full pl-10 lg:pl-12 h-12 md:h-14 lg:h-16 text-neutral placeholder:text-neutral-light font-body text-base lg:text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm lg:text-base font-medium text-neutral mb-2 font-body"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 lg:h-6 lg:w-6 text-neutral-light" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered bg-base-100 border-base-300 w-full pl-10 lg:pl-12 pr-10 lg:pr-12 h-12 md:h-14 lg:h-16 text-neutral placeholder:text-neutral-light font-body text-base lg:text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5 lg:h-6 lg:w-6 text-neutral-light hover:text-neutral transition-colors duration-200" />
                  ) : (
                    <HiEye className="h-5 w-5 lg:h-6 lg:w-6 text-neutral-light hover:text-neutral transition-colors duration-200" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-12 md:h-14 lg:h-16 text-base md:text-lg lg:text-xl font-body font-medium text-white border-0 hover:scale-[1.02] transition-transform duration-200 mt-6"
            >
              Login
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
              Continue with Google
            </button>

            {!showDemoOptions ? (
              <button
                type="button"
                className="btn btn-outline border-2 border-primary bg-primary/5 hover:bg-primary/10 hover:border-primary w-full h-12 md:h-14 text-primary font-body font-medium transition-all duration-200"
                onClick={() => setShowDemoOptions(true)}
              >
                Try Demo Account
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="btn btn-outline border-2 border-primary bg-base-100 hover:bg-primary/5 hover:border-primary flex-1 h-12 md:h-14 text-primary font-body font-medium transition-all duration-200 flex items-center gap-2 justify-center"
                  onClick={handleUserDemo}
                >
                  <FaUser className="text-sm" />
                  <span>User Demo</span>
                </button>
                <button
                  type="button"
                  className="btn btn-outline border-2 border-secondary bg-base-100 hover:bg-secondary/5 hover:border-secondary flex-1 h-12 md:h-14 text-secondary font-body font-medium transition-all duration-200 flex items-center gap-2 justify-center"
                  onClick={handleAdminDemo}
                >
                  <FaUserShield className="text-sm" />
                  <span>Admin Demo</span>
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-medium font-body">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary-dark font-semibold transition-colors duration-200"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-medium font-body">
            By logging in, you agree to our{" "}
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

export default Login;
