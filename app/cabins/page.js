import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

// export const revalidate = 0; //it is another convention by nextjs by this we will make this page dynamic, and const revalidate = 0 means we are revalidating data as it is cashed so it might give wrong value so by this , we are telling it to revalidate it in the 0 seconds means always fresh data is present here, so the issue is whole page does not have to be dynamic only price will change of the cabins over the type so we want a middle between static and dynamic so here incramental static regeneration comes into play, incramental static regeneration fetch the data of a static page over the time and we can give the time in revalidate
export const revalidate = 3600; // 1 hour we give time in second and we dont give computed value here like 12*12 , we only give perfect value, data changes oftenly but not frequently, for learning as searchParams will make the whole page dynamic

export const metadata = {
  title: "Cabins",
}; // we can overwrite the title of the page like this

export default function Page({ searchParams }) {
  // we get access to searchParams in the nextjs page component so if our url is http://localhost:3000/cabins?capacity=small searchParams is { capacity: 'small' }
  // console.log(searchParams); // { capacity: 'small' }
  // if searchParams changes then this server component re-renders

  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        {/* we have written key={filter} bcz all page navigations is wrapped in the transition in nextjs so in that case suspense will not re-render the callback so the solution is by passing the key,  if we change the filter then spinner is not shown so key will help us to differentiate the different filters and thus whenever the key changes fallback will occur */}
        <CabinList filter={filter} />
      </Suspense>
      {/* We only want to use spinner where we have data fetching logic and not in the whole app thats why we did it this way, so now spinner is shown below the h1 and paragraph, without this we will see spinner in whole Cabibs component, Suspense needs to be outside the component which does async work */}
    </div>
  );
}
