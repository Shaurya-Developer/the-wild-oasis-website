"use client";

import { useState, createContext, useContext } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext); // we can also use use() hook which is React 19 newly launchedhook

  if (context === undefined)
    throw new Error("Context was used outside provoder");

  return context;
}

export { ReservationProvider, useReservation };
