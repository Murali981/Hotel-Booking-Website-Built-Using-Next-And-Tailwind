"use client";

import { TrashIcon } from "@heroicons/react/24/solid";

import { useTransition } from "react";
import SpinnerMini from "@/app/_components/SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition(); // This useTransition() builtIn hook going to return two things where the
  // first thing is the "isPending" flag and this flag is just a boolean which will return true while the state transition is happening
  // so we can display a loading indicator whenever the state transition is happening and the second part we gonna get is
  // startTransition() function and using this startTransition() function we will wrap the heavy state update into.

  /////////////// HOW DO WE WRAP THE STATE TRANSITION INTO THE STARTTRANSITION() FUNCTION ? //////////////

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?")) {
      startTransition(() => onDelete(bookingId));
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {/* In the above button we are invoking the deleteReservation server action from the onClick prop directly but we are not
        passing a action prop inside a form to add a server action which we had previously did in the updateGuest and also there is 
         no need of <form> html tag for deleting a reservation and also before adding the onClick prop this DeleteReservation.js
        component is a server component but now after adding the onClick prop to add a deleteReservation server action as we are 
        adding interactivity to this button , it has to be a client component , So we have added the "use client" directive at
        the top of this component file. */}
      {/* ////////////// Displaying a loading indicator when the Delete button is clicked /////////////////////////
        Now the first and foremost concern is how does the "Delete" button know that after clicking on the delete button 
         using onClick prop that it is performing  an asynchronous server action where we have to display a loading indicator
        whenever we click the "Delete" button but in the UpdateProfileForm.js component we have used the useFormStatus() hook
         to render a loading indicator whenver the form is submitted but here we are not using a <form> html element 
          action prop to perform a server action "deleteReservation(bookingId)" . So here we cannot use the "useFormStatus()"
           hook because we are not using a form to perform a server action but we are using a button onClick={} prop to
           perform a server action. So here we are using a "useTransition()" builtIn hook which was introduced in react-18 version
           as being a so called concurrent feature . At the core , useTransition() hook allows us to mark  a state update as a 
           so called  transition  and when a state update is marked as a transition by using the useTransition() hook  then
           that state update will happen without blocking the UI which means that the UI will stay responsive during a re-render
           and also we will get an indication that a state transition is happening . This can be useful in vanilla react for very
            very state updates  that might block the UI And in the Next.js we can use this useTransition() hook to mark a 
            server action  as a transition too which gonna allow us to get the indication that something is happening in the
            background */}
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
