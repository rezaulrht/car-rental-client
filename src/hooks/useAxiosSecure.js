import axios from "axios";
import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = use(AuthContext);

  // set token in the header for all the api call using axiosSecure hook

  useEffect(() => {
    //  request interceptor

    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    });

    // response interceptor

    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          console.log("log out the user for bad request");
          signOutUser().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
