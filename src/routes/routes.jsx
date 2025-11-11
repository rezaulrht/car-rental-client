import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Error404 from "../components/error404";
import AddCar from "../pages/AddCar/AddCar";
import PrivateRoute from "./PrivateRoutes";
import MyListings from "../pages/MyListings/MyListings";
import BrowseCars from "../pages/BrowseCars/BrowseCars";


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/register",
        Component: Register
      },
      {
        path: "/add-car",
        element: <PrivateRoute><AddCar /></PrivateRoute>
      },
      {
        path: "/my-listings",
        element: <PrivateRoute><MyListings /></PrivateRoute>
      },
      {
        path: "/browse",
        Component: BrowseCars
      }
    ],
  },
  {
    path: "*",
    Component: Error404
  }
]);
export default router;
