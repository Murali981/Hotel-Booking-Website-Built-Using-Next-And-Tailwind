"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus(); // This hook will know about the status of the form and it will return us multiple values in an object
  // that we can destructure and "pending" state is returned when the form is performing the asynchronous server action task and also
  // there are other two states will also be returned but those are not needed right now , So we are only destructuring the "pending"
  // state that is returned from the "useFormStatus()" builtIn hook. and also please remember that whenver you are using a hook inside
  // a component then it must be a client component . Here the "updateProfileForm.js" is already a client component . So we don't
  // have any problem here as the Button component is a child component to the "updateProfileForm.js" , So it will also be a client
  // component.
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold
       hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500
        disabled:text-gray-300"
      disabled={pending} // The button will get disabled whenever the form status is in pending state.
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
