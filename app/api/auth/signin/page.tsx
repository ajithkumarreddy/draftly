"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div
      className="flex min-h-screen p-4"
      style={{
        backgroundImage: "url('/bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-2/3">
      </div>
      <div className="w-1/3 text-white flex flex-col justify-between items-start bg-primaryColor rounded-xl p-12">
        <h1 className="text-sm font-semibold uppercase">Draftly</h1>
        <div>
          <h2 className="text-5xl font-semibold mb-8">
            Start your journey with us.
          </h2>
          <h3 className="text-md font-medium mb-12">
            Join the leading platform for creating, editing, and managing your
            documents seamlessly.
          </h3>
          <form
              onSubmit={async (e) => {
                e.preventDefault();
                await signIn("google", { callbackUrl: "/dashboard" });
              }}
            >
              <Button
                type="submit"
                className="bg-white text-primaryColor p-6 w-full rounded-md hover:bg-slate-100"
              >
                <span className="font-semibold text-lg">
                  Sign in with Google
                </span>
              </Button>
            </form>
        </div>
        <div className="card-text mt-6 text-sm bg-secondaryColor p-6 rounded-lg">
          <p className="mb-2">
            Draftly revolutionized the way I manage documents. The ease of use
            and advanced features are unmatched.
          </p>
          <p className="font-semibold text-sm italic">
            – Limion, Business Owner
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
