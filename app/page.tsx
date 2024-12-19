"use client";

import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/client";

export default function Home() {
  const { user, setUser, isHydrated } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

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
