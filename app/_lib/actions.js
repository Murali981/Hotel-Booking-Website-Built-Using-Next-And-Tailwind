"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

// This is used for implementing the server actions part

export async function updateGuest(formData) {
  // How we will get the submitted form data of UpdateProfileForm.js component into this  updateGuest() server action . For this
  //  we don't need to do anything at all because that's the beauty of using these server actions as we don't need any additional
  // javascript here and no additional state at all because the submitted data through the <form> html element will simply automatically
  // pass all the form data through this action={updateGuest} using the native formData API and we are getting the formData as
  // a prop into the updateGuest server action and we can call this prop with any name but we are calling it as formData because
  // it is closely related and also please remember that inorder to formData to work each of the form inputs needs a name because
  // in the formData each field will be simply identified by the name we give it in the form input field.
  console.log(formData);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Please remember that when we are in server actions page which is actions.js then we are in the backend which means we are
  // basically doing backend development here. So we always make sure of two things , First thing is , the user who is invoking this
  // server action actually has the authorization of doing the action that the server action is suppossed to do and the second thing
  // is we have to treat all the inputs as unsafe . So let's start the authorization and authentication part here.....
  ///////////////////// AUTHENTICATION PART ////////////////////////////////////////////////////////////////////////////////////
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }
  // It is a common practice in server actions which is don't use the try{} catch{} declaration here. But we simply throw the
  // errors inside the function body as above.

  const nationalID = formData.get("nationalID"); // This formData is a web-API which also works in the browser.

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    // This is a REGEX expression to check the nationalID
    throw new Error("Please provide a valid national ID");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId); // update the guests table whenever the id is equal to the session.user.guestId with the
  // updateData

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile"); // This is a builtIn cache function from "next/cache" package which is used to fill the browser cache
  // with fresh data everytime like the data will be fetched freshly whenever the data is changed and immediately the browser cache
  // is updated with fresh data that is fetched from the supabase whenever  anything is updated in the supabase. This is called
  // revalidating the cache.

  //// Once the retrieval of the updateData from the formData is successfull then update the supabase using the supabase api functions
  // which are described in the _lib/data-service.js
}

export async function createBooking(bookingData, formData) {
  /// We are using the bind() function to send the additional data to this server action . Please remember that if we are
  // using the bind() function then the formData will come as the second argument and the additional Data that we are sending
  // through the bind() function will come as the first argument.
  //   console.log(bookingData);
  //   console.log(formData);
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

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

  console.log(newBooking);

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  //   // For testing
  //   await new Promise((res) => setTimeout(res, 2000)); // We are adding some artificial delay of 2000ms = 2seconds in the
  //   // deleteReservation(bookingId) server action

  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }
  // It is a common practice in server actions which is don't use the try{} catch{} declaration here. But we simply throw the
  // errors inside the function body as above.

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    // Here we are checking the condition that  the guest can only delete his/her reservations but he can't delete another guest
    // reservations (or) bookings
    throw new Error("You are not allowed to delete this reservation");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations"); // All the data that is associated to this route "/account/reservations" will be revalidated.
  // And if we had multiple pieces of data that were fetched on this route (or) path then all of them would be revalidated . So this
  // is how it works with revalidated path
}
// It is a common practice in server actions which is don't use the try{} catch{} declaration here. But we simply throw the
// errors inside the function body as above.
export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  //////////////// AUTHENTICATION PART STARTED //////////////////////////////
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }
  /////////////// AUTHENTICATION PART  END ////////////////////////

  //////////////// AUTHORIZATION PART STARTED ////////////////////////////

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    // Here we are checking the condition that  the guest can only delete his/her reservations but he can't delete another guest
    // reservations (or) bookings
    throw new Error("You are not allowed to update this reservation");
  }

  //////////////// AUTHORIZATION PART END ////////////////////////////

  //////////// Note on the above server action updateBooking(formData) //////////////////////////
  // server actions do not have the access to the URL because these server actions just basically an API endpoints which run
  // completely independently of the current URL . So we cannot really get any of the params from the url
  // "localhost:3000/account/reservations/edit/:bookingId" which is this dynamic param ":bookingId" we want from the URL .
  // So that's why we are passing the "bookingId" as a hidden input to this "formData" which this updateBooking(formData) is receiving.

  ////////////// UPDATING THE DATA ///////////////////////////////
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000), // Here the user can only write the observations of maximum 1000
    // characters only
  };

  ////////////////// MUTATING THE DATA ///////////////////////////////

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  /////////////////// ERROR HANDLING ////////////////////////////////////////

  if (error) {
    throw new Error("Booking could not be updated");
  }

  ///////////////////// REVALIDATION SHOULD HAPPEN BEFORE REDIRECTING //////////////////
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  //////////////////// REDIRECTING TO THE RESERVATIONS PAGE ///////////////////////////
  redirect("/account/reservations");
}

export async function signInAction() {
  // when the user successfully logged into the google page then then he will be redirected to the "/account" page
  await signIn("google", { redirectTo: "/account" }); // This is a server action because if you see in the file SignInButton.js we can't
  // write in the button the onClick={} prop because "SignInButton.js" file is a server component and on the server component we should
  // not write any interactivity as you know to implement interactivity it has to be a client component but we can make a server
  // component interactive by adding the server actions to it . Firstly we have to go to the server component which is SignInButton.js
  // and add a <form action={signInAction}><button></button></form> around the button) (or) wrap the  <button> with  the form tag with a action
  // and also create an action.js component to mention all the server actions in it.
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
