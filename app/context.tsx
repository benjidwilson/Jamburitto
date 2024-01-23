// AuthContext.tsx
"use client";
import React, { useContext, createContext } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

export const AuthContext = createContext<{ user: User | null } | null>(null);
// export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  console.log(user);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
