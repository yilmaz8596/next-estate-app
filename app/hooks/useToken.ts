"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { onAuthStateChanged, ParsedToken } from "firebase/auth";
import { auth } from "@/firebase/client";
import { setToken, removeToken } from "../actions/actions";

export const useToken = () => {
  const [customClaims, setCustomClaims] = useState<ParsedToken | null>(null);
  const { setUser } = useAppStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const tokenResult = await firebaseUser.getIdTokenResult();
        const token = tokenResult.token;
        const refreshToken = firebaseUser.refreshToken;
        setCustomClaims(tokenResult.claims ?? null);

        if (token && refreshToken) {
          await setToken(token, refreshToken);
        } else {
          setUser(null);
          setCustomClaims(null);
          await removeToken();
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return { customClaims };
};
