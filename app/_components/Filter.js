"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();

  const router = useRouter(); // make sure that this custom hook imported from the "next/navigation" package.

  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all"; // If we the "capacity" doesn't exist then we are using this
  // null coalescing operator where if there is nothing in the URL then take "all"

  function handleFilter(filter) {
    //  if this Filter.js is  a server component then we can get access to the query params by using the searchParams prop provided
    // by the next.js but this Filter.js is not a server component . As this Filter.js is a client component we have to deal it in a
    // different way which is by using the useSearchParams() custom builtIn hook provided by the Next.js and make sure that this
    // custom hook imported from the "next/navigation" package.

    // We are gonna use URLSearchParams web API . This web API is nothing to do with next.js but it is actually a web API that provides
    // a few methods that we can use to manipulate the URL query parameters . So this is specially useful when there are many parameters
    // in the URL because it makes it really easy to interact with all of them . But in this case we have only one which is the
    // capacity query param but it is still useful to learn this method then this becomes a kind of recipe that you just always follow
    // in the future.
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter); // We are setting the capacity to filter that we have got from the URL. This is done internally
    // but it will not navigate to the localhost:3000/cabins?capacity=filter url when we click on the filter buttons which are there
    // in our UI . So for this we can use the replace() function provided by another builtIn custom hook provided by the useRouter()
    // hook.
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    ///////////////////////////////////////////////////// Why we have done all the above things ? ////////////////////////////
    // The answer is , We are initially looking for sharing state between client and the server and in this particular case
    // we wanted to basically have some state regarding the no of guests that should be a filter for the cabins and in the Next.js
    // the best way of sharing the state is just place it in the URL , not only because this is the easiest way to do it but also
    // it makes these pages here really nicely shareable and bookmarkable . So the way we do it is building the filter component as
    // the client component because it needs the interactivity and when we click on each of the below buttons , we just use the
    // router.replace() function to navigate to the new URL And so thanks to next.js where it will create a nice client side
    // navigation and also there will be no full page reloads when we use the router.replace() function and so with this we have
    // added our state to the URL and in particular into the searchParam of capacity and now back on the server we can get that
    // data from the URL where we will get access to the searchParams props provided by the next.js in the page.js file of cabins because
    // the page component gets access to the searchParams prop and this searchParams prop always contains the data that is currently
    // in searchParams
  }

  return (
    <div className="border border-primary-800">
      <Button
        filter="all"
        handleFilter={handleFilter}
        className="px-5 py-2 hover:bg-primary-700"
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        className="px-5 py-2 hover:bg-primary-700"
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        className="px-5 py-2 hover:bg-primary-700"
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Filter;
