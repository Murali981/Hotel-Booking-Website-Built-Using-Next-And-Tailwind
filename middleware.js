// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }

import { auth } from "@/app/_lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/account"], // This matcher is telling that only in "/account" our middleware should run but we can specify an
  // array of routes where our middleware should run. We are only protecting the "/account" route (or) account page as we mentioned
  // only the "/account" route in the matcher array.
};
