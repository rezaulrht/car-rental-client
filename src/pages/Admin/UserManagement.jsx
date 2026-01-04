import React, { useEffect, useState, use } from "react";
import { HiUserGroup, HiShieldCheck } from "react-icons/hi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import AuthContext from "../../contexts/AuthContext";

const UserManagement = () => {
  const axios = useAxiosSecure();
  const { user: currentUser } = use(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "User Management - RentWheels Admin";
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (uid, currentRole) => {
    // Prevent admin from demoting themselves
    if (currentUser.uid === uid && currentRole === "admin") {
      toast.error("You cannot demote yourself!");
      return;
    }

    const newRole = currentRole === "admin" ? "user" : "admin";
    const result = await Swal.fire({
      title: `Change role to ${newRole}?`,
      text: `Are you sure you want to change this user's role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: currentRole === "admin" ? "#d33" : "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, make ${newRole}!`,
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(`/admin/users/${uid}/role`, { role: newRole });
        toast.success(`User role changed to ${newRole} successfully`);
        fetchUsers();
      } catch (error) {
        console.error("Error changing user role:", error);
        toast.error("Failed to change user role");
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral mb-2">
              <HiUserGroup className="inline mr-3 text-primary" />
              User Management
            </h1>
            <p className="text-base text-neutral-medium font-body">
              Manage user roles and permissions
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-medium font-body">Total Users</p>
            <p className="text-3xl font-heading font-bold text-primary">
              {users.length}
            </p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-base-100 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-base-300">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-base-300">
                <th className="font-heading text-neutral">Avatar</th>
                <th className="font-heading text-neutral">Name</th>
                <th className="font-heading text-neutral">Email</th>
                <th className="font-heading text-neutral">Role</th>
                <th className="font-heading text-neutral">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.uid}
                  className="border-base-300 hover:bg-base-200"
                >
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={
                            user.photoURL || "https://via.placeholder.com/150"
                          }
                          alt={user.displayName}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="font-body font-semibold text-neutral">
                      {user.displayName || "No Name"}
                    </p>
                  </td>
                  <td>
                    <p className="font-body text-neutral-medium text-sm">
                      {user.email}
                    </p>
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <span className="badge badge-error text-white gap-1">
                        <HiShieldCheck className="h-4 w-4" />
                        Admin
                      </span>
                    ) : (
                      <span className="badge badge-neutral">User</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleRoleChange(user.uid, user.role)}
                      disabled={
                        currentUser.uid === user.uid && user.role === "admin"
                      }
                      className={`btn btn-sm ${
                        user.role === "admin" ? "btn-error" : "btn-primary"
                      } text-white ${
                        currentUser.uid === user.uid && user.role === "admin"
                          ? "btn-disabled opacity-50"
                          : ""
                      }`}
                      title={
                        currentUser.uid === user.uid && user.role === "admin"
                          ? "You cannot demote yourself"
                          : ""
                      }
                    >
                      {user.role === "admin"
                        ? "Demote to User"
                        : "Promote to Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <HiUserGroup className="mx-auto text-6xl text-neutral-light mb-4" />
            <p className="text-neutral-medium font-body">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
