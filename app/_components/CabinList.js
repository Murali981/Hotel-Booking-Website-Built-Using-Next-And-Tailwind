// import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";

async function CabinList({ filter }) {
  // noStore(); // this line makes this CabinList.js component opts out of the data cache. So it's an uncached data fetching.

  const cabins = await getCabins();

  if (!cabins.length) {
    return null;
  }

  let displayedCabins;

  if (filter === "all") {
    // If the filter is equal to "all" then displayedCabins is equal to all the cabins that we have
    // received from the getCabins() api...
    displayedCabins = cabins;
  }

  if (filter === "small") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  }
  if (filter === "large") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
