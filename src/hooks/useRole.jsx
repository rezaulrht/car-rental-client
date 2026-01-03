import { useState, useEffect, use } from "react";
import AuthContext from "../contexts/AuthContext";
import useAxios from "./useAxios";

const useRole = () => {
  const { user, loading: authLoading } = use(AuthContext);
  const axios = useAxios();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`/users/${user.uid}`);
        setRole(response.data.role || "user");
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole("user"); // Default to user if error
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchUserRole();
    }
  }, [user, authLoading, axios]);

  return { role, loading, isAdmin: role === "admin", isUser: role === "user" };
};

export default useRole;
