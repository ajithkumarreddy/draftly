"use client";

import React, { useEffect } from "react";
import ToggleTheme from "./toggle-theme";
import HeaderLogo from "./headerLogo";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface UserProps {
  name?: string | null;
  image?: string | null;
}

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // If the session is still loading, do not redirect
    if (status === "loading") {
      return; // Don't redirect while loading
    }

    if (!session) {
      // Redirect to sign-in if no session found
      router.push("/api/auth/signin");
    }
  }, [session, status, router]);

  const SignOut = ({ user }: { user: UserProps | null }) => {
    return (
      <div className="avatar">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="flex align-items p-0 h-10 w-10 border-none outline-none">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.image || undefined} alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await signOut();
                }}
              >
                <Button type="submit">Signout</Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <nav className="flex flex-row items-center justify-between p-4 shadow-md">
      <HeaderLogo />
      <div className="flex flex-row items-center space-x-8">
        <ToggleTheme />
        {session && session.user ? (
          <SignOut user={session.user as UserProps} />
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await signIn();
            }}
          >
            <Button type="submit">Sign In</Button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
