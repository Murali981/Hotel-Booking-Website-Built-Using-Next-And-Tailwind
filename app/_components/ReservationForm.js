"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);

  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };
  ////////////////// Note on Above bookingData //////////////////////////////////////////////////////
  // In our form for creating a new reservation which is below , We have only two input fields which are "number of guests" and
  // "observations" but additional to these two input fields we have to send the above bookingData object which contains startDate,
  // endDate , numNights , cabinPrice and cabinId. Previously what we have did is we have sended the additional information as a
  // hidden inputs which are send to the formData and from the formData we will send this formData to perform the server action
  // which mutate the supabase database to create a new reservation but the problem here is there are multiple additional data
  // (bookingData object which contains startDate, endDate , numNights , cabinPrice and cabinId) we have  to send to the formData
  // So here it is not a good idea to use the hidden inputs as there so many inputs to send . So here we are using another alternative
  // which is nothing but a "bind()" method. So what does a bind method will do when you call it on a function is to basically set
  // the "this" keyword of that function and also it allows us to pass some additional arguments into the bind() function . This
  // is what we are going to do now.

  const createBookingWithData = createBooking.bind(null, bookingData); // The first argument for the bind() function is the new
  // value for "this" keyword but we are not interested to it at all. So we are just passing a null . So in the second argument for
  // the bind() we can pass some additional data , and here the additional data is the "bookingData". So this bind() will create a
  // a brand new function which we will store this brand new function and then use this as a form action. So here the
  // "createBookingWithData" is basically a function which already has the bookingData bound to it.

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
