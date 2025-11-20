import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="bg-base-100">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-base-100 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #2563eb 0px, #2563eb 2px, transparent 2px, transparent 60px)",
              }}
            ></div>
          </div>

          <div className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl"></div>

          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-linear-to-tr from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 via-transparent to-transparent rounded-full blur-2xl"></div>

          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-linear-to-br from-emerald-500/8 to-transparent rounded-full blur-2xl animate-pulse-very-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-linear-to-tl from-purple-500/6 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>

          <div className="absolute top-20 right-1/4 w-32 h-32 border border-blue-200/30 rounded-lg rotate-12 animate-float-slow"></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 border border-amber-200/30 rounded-full animate-float-slower"></div>

          <div className="absolute top-1/3 left-1/4 w-20 h-20 border-2 border-indigo-200/20 rounded-full animate-spin-very-slow"></div>
          <div className="absolute bottom-1/4 right-1/5 w-16 h-16 border border-blue-300/25 rounded-lg -rotate-45 animate-float-slow"></div>
          <div className="absolute top-2/3 right-2/3 w-12 h-12 bg-blue-400/5 rounded-full animate-pulse-slower"></div>

          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #2563eb 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>

          <div className="absolute top-32 left-0 text-6xl opacity-20 animate-car-right">
            🚗
          </div>
          <div className="absolute top-2/3 right-0 text-5xl opacity-15 animate-car-left">
            🚙
          </div>
          <div className="absolute bottom-48 left-0 text-7xl opacity-10 animate-car-right-slow">
            🏎️
          </div>

          <div className="absolute top-1/4 right-1/4 text-5xl opacity-10 animate-spin-and-float">
            💰
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-15 animate-spin-slow-reverse">
            💵
          </div>
          <div className="absolute top-1/2 right-1/3 text-6xl opacity-8 animate-spin-and-pulse">
            💲
          </div>

          <div className="absolute top-3/4 right-1/4 text-4xl opacity-12 animate-float-and-rotate">
            🔑
          </div>
        </div>

        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
