import React from "react";
import { Link } from "react-router";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-auto">
      <div className="h-1 bg-linear-to-r from-primary via-secondary to-primary animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <img
                src="/logo.png"
                alt="RentWheels Logo"
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <h2 className="text-xl md:text-2xl font-heading font-bold text-neutral">
                Rent<span className="text-primary">Wheels</span>
              </h2>
            </div>
            <p className="text-xs md:text-sm text-neutral-medium leading-relaxed font-body px-4 md:px-0">
              Connecting riders with trusted car owners — easy, fast, and
              affordable.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-base md:text-lg font-semibold font-heading text-neutral uppercase mb-3 md:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link
                  to="/"
                  className="text-neutral-medium hover:text-primary transition-colors duration-200 text-xs md:text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="text-neutral-medium hover:text-primary transition-colors duration-200 text-xs md:text-sm"
                >
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-neutral-medium hover:text-primary transition-colors duration-200 text-xs md:text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-neutral-medium hover:text-primary transition-colors duration-200 text-xs md:text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-base md:text-lg font-semibold font-heading text-neutral uppercase mb-3 md:mb-4">
              Contact
            </h3>
            <ul className="space-y-2 md:space-y-3 font-body text-xs md:text-sm text-neutral-medium">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <HiMail className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <a
                  href="mailto:support@rentwheels.com"
                  className="hover:text-primary transition-colors duration-200 break-all"
                >
                  support@rentwheels.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <HiPhone className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <span>+880 1234-567-890</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <HiLocationMarker className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-base md:text-lg font-semibold font-heading text-neutral uppercase mb-3 md:mb-4">
              Follow Us
            </h3>
            <div className="flex gap-2 md:gap-3 justify-center md:justify-start">
              <a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="h-4 w-4 md:h-5 md:w-5" />
              </a>

              <a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4 w-4 md:h-5 md:w-5" />
              </a>

              <a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="h-4 w-4 md:h-5 md:w-5" />
              </a>

              <a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300"></div>

      <div className="text-center py-4 md:py-6 px-4 md:px-5">
        <p className="text-xs md:text-sm text-neutral-medium font-body">
          © 2025 RentWheels. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
