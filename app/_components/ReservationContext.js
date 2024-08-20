"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext(); // We have created the context first.

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState); // We want to provide this state to the entire application tree. So the good
  // place for this context is in the global layout page which is nothing but globalPageLayout()

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("Context was used outside the provider");
  }
  return context;
}

export { ReservationProvider, useReservation };
