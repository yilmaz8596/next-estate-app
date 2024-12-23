"use server";

import { auth } from "@/firebase/server";
import { cookies } from "next/headers";

export const setToken = async (accessToken: string, refreshToken: string) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to verify token: ${error}`);
  }
};

export const removeToken = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to remove token: ${error}`);
  }
};

export async function checkAdminStatus(uid: string) {
  try {
    const userRecord = await auth.getUser(uid);
    return userRecord.customClaims?.admin === true;
  } catch (error) {
    console.error("Admin check error:", error);
    return false;
  }
}
