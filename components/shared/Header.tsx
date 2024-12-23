"use client";

import { useAppStore } from "@/store/useAppStore";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HomeIcon } from "lucide-react";
import { MoonIcon, SunIcon } from "lucide-react";

export function Header() {
  const { user, setUser } = useAppStore();
  console.log("User photoURL:", user?.photoURL);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="p-4 border-b flex items-center justify-between">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <HomeIcon className="h-8 w-8 text-primary" />
          <Link
            href="/"
            className="text-primary text-2xl tracking-wider font-semibold"
          >
            Fire Homes
          </Link>
        </div>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <Link href="/search">
            <Button variant="ghost" className="text-slate-600">
              Property Search
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="align-left">
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full focus:ring-0 focus:ring-offset-0"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.photoURL || ""}
                    referrerPolicy="no-referrer"
                    alt={user.displayName || "User avatar"}
                  />
                  <AvatarFallback>
                    {user.displayName?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 flex flex-col items-center">
              <DropdownMenuItem className="flex flex-col p-2">
                <span>
                  <strong>{user.displayName}</strong>
                </span>
                <span className="mt-[-2px]">{user.email}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Link
                  href="/account"
                  className="
        block
        w-full
        p-2
        text-left
        hover:bg-primary
        hover:text-white
      "
                >
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Link
                  href="/admin-dahsboard"
                  className="
        block
        w-full
        p-2
        text-left
        hover:bg-primary
        hover:text-white
      "
                >
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setUser(null);
                  }}
                  className="w-full hover:bg-primary hover:text-white rounded-none justify-start"
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="
          hover:bg-primary hover:text-white
          "
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="ghost" className="hover:bg-primary hover:text-white">
            <Link href="/signup">Signup</Link>
          </Button>
        </div>
      )}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="ml-2"
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </nav>
  );
}
