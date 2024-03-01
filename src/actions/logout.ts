"use server";

import { signOut } from "@/auth";

async function logout() {
  return signOut();
}

export { logout };
