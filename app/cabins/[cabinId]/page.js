import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// export const metadata = {
//   title: "Cabin",
// }; This is we are statically setting the metadata and exporting the title to appear on the browser's tab when we are in this
// route.

export async function generateMetadata({ params }) {
  // Here we are dynamically generating the metadata when we click on a
  // particular cabinId by using the builtIn generateMetadata({params}) function which gives access to params. So that
  // the particular cabinId will be rendered on the browser tab depends on which cabinId we have clicked on the
  // localhost:3000/cabins/:cabinId page
  const { name } = await getCabin(params.cabinId); // Why we have written params.cabinId because we have created the [cabinId] folder
  // in the dynamic routes of the file structure of this Next.js appication. (localhost:3000/cabins/:cabinId)
  // Here the destructuring the name gives the cabinId into the name.
  //   if (name === null) return;
  return {
    title: `Cabin ${name}`, // For ex : Cabin 004 where "004" is the params.cabinId
  };
}

export async function generateStaticParams() {
  // The use of this getStaticParams() function is , When you run the command
  // in the terminal which is npm run build then all pages will be prerendered as static content and static HTML ,
  // We have only one dynamic route in our application which is localhost:3000/cabins/:cabinId but we are generating the
  // static params for this dynamic route using getStaticParams() function which helps in rendering this dynamic route as
  // a static content.
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

// // PLACEHOLDER DATA
// const cabin = {
//   id: 89,
//   name: "001",
//   maxCapacity: 2,
//   regularPrice: 250,
//   discount: 0,
//   description:
//     "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
//   image:
//     "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
// };

// In any page (or) a layout which is associated with a dynamic route segment will get access to a params argument (or) a
// params prop
export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  ////////////// Problem in the above three apiServices we are using which are getCabin(params.cabinId) ,getSettings() and  getBookedDatesByCabinId(params.cabinId) /////////////////////////////
  ///// In the above we are using three data service API's we are using where it will create more time to load all the  cabin data of
  // the localhost:3000/cabins/:cabinId route because let us say the first API request which is getCabin() takes 2 seconds to get the
  // the cabins data related to that particular cabinId and since it is a async-await request until the first API request got the
  // response of the cabin data the remaining two API requests (getSettings() and  getBookedDatesByCabinId(params.cabinId)) will wait
  // and again the second API request(getSettings()) takes 2 seconds to get the settings data and since it is a async-await request until
  // the second API request got the  response of the settings data the remaining one API request (getBookedDatesByCabinId(params.cabinId)) will wait.
  // So if the last API request(getBookedDatesByCabinId(params.cabinId)) takes another 2 seconds then to load the complete cabin data it
  // will take 6 seconds(2+2+2) . So to solve this problem we use Promise.all() function where we will pass all the three API requests
  // into this Promis.all([getCabin(params.cabinId) ,getSettings() , getBookedDatesByCabinId(params.cabinId)]) as an array , So no
  // API request will wait for another API's response as all the API requests run in parallel.

  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinId),
  // ]);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
