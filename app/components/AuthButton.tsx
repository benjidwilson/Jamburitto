// AuthButton.tsx
import React from "react";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

interface AuthButtonProps {}

const AuthButton: React.FC<AuthButtonProps> = () => {
  const auth = getAuth(firebase_app);
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default AuthButton;
