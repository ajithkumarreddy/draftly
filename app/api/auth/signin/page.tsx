"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
      <div className="space-y-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await signIn("google", { callbackUrl: "/dashboard" });
          }}
        >
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  );
}
