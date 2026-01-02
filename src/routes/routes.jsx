import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Error404 from "../components/error404";
import AddCar from "../pages/AddCar/AddCar";
import PrivateRoute from "./PrivateRoutes";
import MyListings from "../pages/MyListings/MyListings";
import MyBookings from "../pages/MyBookings/MyBookings";
import BrowseCars from "../pages/BrowseCars/BrowseCars";
import LearnMore from "../pages/LearnMore/LearnMore";
import CarDetails from "../pages/CarDetails/CarDetails";
import Loader from "../components/Loader";
import Profile from "../pages/Profile/Profile";
import DashboardHome from "../pages/Dashboard/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <Loader />,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/browse",
        Component: BrowseCars,
      },
      {
        path: "/car-details/:id",
        element: (
          <PrivateRoute>
            <CarDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/learn-more",
        Component: LearnMore,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-bookings",
        Component: MyBookings,
      },
      {
        path: "my-listings",
        Component: MyListings,
      },
      {
        path: "add-car",
        Component: AddCar,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "*",
    Component: Error404,
  },
]);
export default router;
