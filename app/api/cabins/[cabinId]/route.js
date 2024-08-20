// From this route.js , we can export one (or) more functions where each of them can correspond to one of the HTTP verbs . We can have
// most basic one which is an ASYNC function called GET. This is for a GET request.

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  // making a GET request to the API end point. Now inorder to send back a response to this API end point (or) even to check
  // out the request itself , these route handlers use web standards such as REQUEST and RESPONSE . For example doing Response.json()
  // and again this Response is not a Next.js feature but really a web-standard that has been implemented in browsers as well.

  const { cabinId } = params; // We want to fetch all the data about a specific cabin and also we want to get all the booked
  // dates for this cabin in the future. This is the data we want to provide to our imaginary affiliates.

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates }); // We are simply using this Response WEB Api .json() where we can send some response back
  } catch {
    return Response.json({ message: "Cabin not found" });
  }

  console.log(cabinId);
}

// export async function POST() {}
