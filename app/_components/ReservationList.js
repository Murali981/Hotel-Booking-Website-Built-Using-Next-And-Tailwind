"use client";

import ReservationCard from "./ReservationCard";

import { deleteBooking } from "../_lib/actions";

import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  ); // The "optimisticBookings" which is the state returned from the useOptimistic() builtIn hook where it's initial state of
  // the "optimisticBookings" is the "bookings" that we have passed into the useOptimistic() builtIn hook. And the second one
  // that we have passed to the useOptimistic() builtIn hook is the "state update() function" which we have represented it as "() => {}"
  // This state update() function (() => {}) will take the current state which is the current Bookings state and also it will take the
  // argument what we have passed into the "optimisticDelete(bookingId)" function which is the bookingId. This "optimisticDelete" is
  // basically like a setter function. So now after taking the "curBookings" state and the "bookingId" it will  determine the next
  // optimistic state. So you can see that in the state update function which we are passing it as a second argument we are returning the
  //  next optimistic state where we are filtering the bookingId that we have passed which means we are removing the  booking
  //  from the UI that we want to delete.

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId); // This optimisticDelete() function came from the useOptimistic() builtIn hook.
    await deleteBooking(bookingId); // This is a server action we are invoking which we are deleting from the actual server.
  } // This is the complete handleDelete(bookingId) function which we are passing to the reservationCard where finally this
  // handleDelete(bookingId) function will be invoked when the delete button is clicked which is inside the deleteReservation()
  // component where the actual delete button is there which invokes this handleDelete(bookingId) function.

  return (
    <div>
      <ul className="space-y-6">
        {optimisticBookings.map((booking) => (
          <ReservationCard
            booking={booking}
            onDelete={handleDelete}
            key={booking.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
