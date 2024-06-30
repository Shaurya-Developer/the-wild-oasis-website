// server actions, it will only run on the server
"use server";

import { signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); // add our provider in the signIn, where we want to redirect the user once they are authenticated
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
