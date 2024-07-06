"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  /* we can make server action like this but as it is client component so we will not do like this
  function deleteReservation() {
    "use server";
    // code
  }
    */
  // useTransition hook allows us to mark a state update as we call transition, so it will not block the UI, used when we want to see if the server action is doing task in the background for a button, if this was a foem then we could have used useFormStatus hook
  const [isPending, startTranistion] = useTransition(); // we get 2 values, 1- true while state transition is happening, 2- startTranistion function so this is the function we wrap heavy state update into

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTranistion(() => onDelete(bookingId));
  }
  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
