// server actions, it will only run on the server
"use server"; // it is a bridge from going from the client to the server

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBookings } from "./data-service";
import { RedirectType, redirect } from "next/navigation";
import { createKey } from "next/dist/shared/lib/router/router";

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

  revalidatePath("/account/profile"); // (on demand validation) revalidating our cache manually otherwise it will give us stale data stored in the cache for 30sec
}

export async function createBooking(bookingData, formData) {
  // bookingData is the first argument bcz we are using bind where we call this function
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  // zod is a library which we can use to validate the data

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function updateBooking(formdata) {
  const bookingId = +formdata.get("bookingId");

  //Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Auhtorization

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingId = guestBookings.map((booking) => booking.id);

  if (!guestBookingId.includes(bookingId)) {
    throw new Error("You are not allowed to update this booking");
  }

  const numGuests = +formdata.get("numGuests");
  const observations = formdata.get("observations");
  const updatedFields = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // only allow user to delete only his own booking , otherwise he will be able to delete any booking using booking id as shown in lecture 484
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingId = guestBookings.map((booking) => booking.id);
  if (!guestBookingId.includes(bookingId)) {
    throw new Error("You are not allowed to delete this booking");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); // add our provider in the signIn, where we want to redirect the user once they are authenticated
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
