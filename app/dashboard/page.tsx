"use client";

import Image from "next/image";
import { AuthContext } from "../context";
import React, { useContext } from "react";
import firebase from "firebase/compat/app";
import { redirect } from "next/navigation";
import AuthButton from "../components/AuthButton";
export default function Home() {
  const { user } = useContext(AuthContext) as { user: firebase.User };

  React.useEffect(() => {
    if (user == null) redirect("/auth/login");
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/images/nextjs.svg"
          alt="Next.js Logo"
          width={200}
          height={160}
        />
        <h1 className="text-6xl font-bold mt-10">Next.js</h1>
        <p className="text-2xl mt-4">
          with Tailwind CSS, TypeScript, ESLint, Prettier, Husky, Lint-Staged,
          Absolute Imports, and Absolute Paths
        </p>
        <AuthButton />
      </div>
    </main>
  );
}
