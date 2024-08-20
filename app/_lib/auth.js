import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; // this is the trick to convert any value to a boolean . This expression means if the auth?.user exists
      // then return true and otherwise return false
    },
    // Here the callbacks will be an object where we have to specify the authorized() function and this authorized() function has to
    // return either true (or) false . If we return true then the current user is authorized to go through onto the route that
    // is being protected. The nextauth is going to call this authorized() function whenever the user tries to access this "/account"
    // route (or) page . This authorized() function will take two parameters as input where one is the auth which gives the current
    // user's session details and the second parameter is the request.
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }

        return true;
      } catch {
        return false;
      }
    }, // This callback signIn() function runs before the actual signUp process happens
    async session({ session, user }) {
      // This session callback is called after the above signIn() callback function is completed.
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login", // here when we click on the signIn page of the google then it will be redirected to "/google" and also
    // it will be connected to the "app->login->page.js" file which is our login file and the login component . Also please
    // remember the name should be "signIn" only because it is prebuiltIn of nextAuth npm package then only the nextAuth picks
    // the signin with google and connect it to the "localhost:3000/login" route
    // When you click on the GuestArea button on the header part of our UI then it will redirect to "/login" route
    // and then it will open a "Continue with google"
  },
};

export const {
  auth, // This auth function we can call in any server component if we want
  signIn, // We have exported this builtIn signIn function from the  NextAuth
  signOut,
  handlers: { GET, POST }, // These GET and POST handlers are coming as a result for calling the NextAuth() function.
} = NextAuth(authConfig);
