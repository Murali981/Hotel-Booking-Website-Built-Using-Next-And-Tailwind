"use client";

import { useState } from "react";
import { updateGuest } from "../_lib/actions";
import SubmitButton from "@/app/_components/SubmitButton";

function UpdateProfileForm({ guest, children }) {
  const [count, setCount] = useState();

  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  return (
    <div>
      <form
        action={updateGuest} // This is a server action of calling the updateGuest  which is in actions.js file and also this
        // updateGuest server action will be invoked when we have submitted this form.
        ////// Displaying a loading indicator when the form is submitted /////////////////////////////
        // Now the first and foremost concern is how does the "update profile" button know that the action the form is performing
        // an asynchronous server action where we have to display a loading indicator whenever we click the "update profile" button
        // and after the update profile button is clicked then the form is getting submitted with a asynchronous server action
        // "updateGuest" it is performing . So inorder to do this react gave us a new hook and this new hook is actually part of the
        // react-dom and not just react and this new hook is called "useFormStatus()" . This hook must be used in a component that's
        // rendered inside a form but not inside a component that simply contains a form . This is a brand new react hook which is
        // adapted by the next.js. So for using this brand new hook we are creating a new component called Button() and inside the
        // Button component we will use this brand new hook useFormStatus and then we will render this "Button()" component inside the
        // updateProfileForm() component where the <form> html element is present inside this updateProfileForm() component.
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            defaultValue={fullName}
            name="fullName"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            defaultValue={email}
            name="email"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          </div>
          {children}
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            defaultValue={nationalID}
            name="nationalID"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
