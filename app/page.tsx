"use client";

import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, setUser, isHydrated } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/login");
    }
  }, [user, isHydrated]);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return <div>Home</div>;
}
