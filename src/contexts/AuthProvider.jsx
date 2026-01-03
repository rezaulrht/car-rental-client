import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxios from "../hooks/useAxios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const axios = useAxios(); // Keep useAxios here for public endpoints like user registration

  const googleProvider = new GoogleAuthProvider();

  const saveUserToBackend = async (userInfo) => {
    try {
      const response = await axios.post("/users", {
        uid: userInfo.uid,
        email: userInfo.email,
        displayName: userInfo.displayName || "No Name",
        photoURL: userInfo.photoURL || null,
      });
      console.log("User saved to backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error saving user to backend:", error);
      throw error;
    }
  };

  const createUser = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserToBackend(result.user);
    setLoading(false);
    return result;
  };

  const updateUserProfile = async (name, photoURL) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      await saveUserToBackend(auth.currentUser);
    }
  };

  const loginUserwithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await saveUserToBackend(result.user);
    setLoading(false);
    return result;
  };

  const loginUser = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await saveUserToBackend(result.user);
    setLoading(false);
    return result;
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // Fetch user role from backend
      if (currentUser) {
        try {
          const response = await axios.get(`/users/${currentUser.uid}`);
          setUserRole(response.data.role || "user");
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("user"); // Default to user if error
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [axios]);

  const authInfo = {
    createUser,
    loginUser,
    loginUserwithGoogle,
    signOutUser,
    updateUserProfile,
    user,
    loading,
    userRole,
    setUser,
  };
  return (
    <div>
      <AuthContext value={authInfo}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
