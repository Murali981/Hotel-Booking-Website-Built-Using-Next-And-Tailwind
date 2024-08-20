"use server";
import { signIn, signOut } from "./auth";

// This is used for implementing the server actions part

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
