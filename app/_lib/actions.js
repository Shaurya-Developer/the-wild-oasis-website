// server actions, it will only run on the server
"use server"; // it is a bridge from going from the client to the server

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";

// ALl function should be async
export async function updateGuest(formdata) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formdata.get("nationalID"); // we have to ge value from the formdata in this way
  const [nationality, countryFlag] = formdata.get("nationality").split("%");

  const regex = /^[a-zA-Z0-9]{6,12}$/;
  if (!regex.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile"); // revalidating our cache manually otherwise it will give us stale data stored in the cache for 30sec
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); // add our provider in the signIn, where we want to redirect the user once they are authenticated
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
