"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the session is still loading, do not redirect
    if (status === "loading") {
      return;
    }

    if (!session) {
      // Redirect to sign-in if no session found
      router.push("/api/auth/signin");
    }
  }, [session, status, router]);

  return (
    <main>
      <Navbar />
      <section>
        {children}
        <Toaster position="bottom-center" richColors/>
      </section>
    </main>
  );
};

export default Layout;
