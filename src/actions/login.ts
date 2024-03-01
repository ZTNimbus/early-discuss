"use server";

import { signIn } from "@/auth";

async function login() {
  return signIn("github");
}

export { login };
