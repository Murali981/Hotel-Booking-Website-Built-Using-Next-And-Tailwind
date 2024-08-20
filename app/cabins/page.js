import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 0; // We are making this route "localhost:3000/cabins" dynamic again. We are gonna force it to become
// dynamic . We are setting the revalidate of this route to zero. It means the data will be always revalidated which effectively makes
// this page dynamic again.

// export const revalidate = someNumber(it can be any number) => After setting some number to the revalidate then Next.js will
// automatically refetch the data after the number of seconds that we have specified in the revalidate const variable where it will
// swap the data out and cache it in the data cache again and regenerate the static pages as well. This is a kind of middle ground
// between fully static and dynamic . Now the value that we specify here in this revalidate const variable will depend on how often
// this data changes . Again the revalidate value must be given in seconds . Let us suppose we assume that the data of the cabins
// prices changes here for every 24 hours then we will convert the 24 hours into seconds which is (60 * 60) = 3600 seconds , So we
// will give the export const revalidate = 3600.

export const metadata = {
  title: "Cabins", // Here when we click on "cabins" route which is "localhost:3000/cabins" then "Cabins" will be seen in the
  // the browser tab.
};

export default function Page({ searchParams }) {
  // The "searchParams" will be only available on the page.js but not in the serverComponents . Here the searchParams are
  // present in the Url which is after the question mark(?) ...For example the URL is localhost:3000/cabins?capacity=small, So
  // now the searchParams will be {capacity:"small"}.... This searchParams prop will get by every page.js file like the normal
  // params prop. We have succesfully getting the searchParams from reading the url into this server component localhost:3000/cabins
  // app => cabins => page.js
  // console.log(searchParams); // It prints {capacity:"small"} in the console

  const filter = searchParams?.capacity ?? "all"; // If the searchParams doesn't exist then it will store "all" in the filter

  // console.log(filter);

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        {/* suspense react element takes a fallback prop where we are rendering a spinner when it tries to fetch the 
          cabins data from supabase using a supabase API */}
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
      {/* Inorder to stream a single piece of UI  and in particular the list of cabins that we have been working with.
           As we learned previously  we can use a loading.js file  inorder to implement streaming and show a loading indicator 
          for an entire route segment . Previously we  have showed a loading indicator for the entire localhost:3000/cabins 
           route which is blocking the entire page for the route localhost:3000/cabins which is ultimately blocking the 
            entire UI . We are saying blocking here because the <h1> and the <p> elements doesn't depend on the data at
            all. So the <h1> and <p> could be loaded immediately  and only the cabin list  which depends on the data
            would need to be streamed in but not the entire localhost:3000/cabins page. So we can have a more granular
             strategy for streaming the data here . So streaming  the cabin data only for the cabin list itself . So in
             Next.js we can use a suspense boundary inorder to achieve that. All we have to do is to move all the data fetching
              into it's own component  and then wrap that component into a Suspense boundary.  */}
    </div>
  );
}
