"use client";

import React from "react";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  ); // helps us to show new state while some async action is still happening, we call it as optimistic bcz we have to pretent that the async function is fulfilled but rather it is running in the background
  //we have to think about 2 states , one is the actual state and other is the optimistic state where we have deleted the reservation (In the background if the deletion is not successfully it will rollback the whole thing automatically)
  // useOptimistic takes 2 arguments, 1- current state (while no async action is running), 2- update function which will give us the computed next state, we get 2 values from this, 1- optimistic state, 2- setter function (which will take the current state and the arguments we give while calling the function)
  // we are doing like this bcz it will make deletion of the reservation much faster

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
