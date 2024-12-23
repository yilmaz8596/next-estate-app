"use client";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/client";

import { Button } from "./ui/button";

export default function ContinueWithGoogleButton() {
  const { setUser } = useAppStore();
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            setUser(result.user);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            router.push("/");
          });
      }}
      className="w-full"
    >
      Continue with Google
    </Button>
  );
}
