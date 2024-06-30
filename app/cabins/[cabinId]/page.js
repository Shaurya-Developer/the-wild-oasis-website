// dynamic route have to give name inside []
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// export const metadata = {
//     title: "Cabin"
// };
// generating metadata automatically, we have to write generateMetadata, dont change its name, it gets access to params
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
} // generateStaticParams is another nextjs function by this we can tell nextjs which params(cabin id) exist for this dynamic route, we have to return an array which have object and object should have the kaey name as the name of the folder like here it is cabinId, so if we do like this then in build it is rendered as (SSG) (Static Side Generation) previously it was rendered as dynamic route, images will not work if we run the build data because we are using Images component given by next and it optimize the images on the nextjs server so they dont work in simple html out from the build command, so to fix this we can use simple img tag in the app or use services like cloudinary
// If we have any dynamic route in the app and we are doing output: "export", in the next.config.mjs then it will give us an error

// dynamic route segment get access to params prop
export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  // const settings = await getSettings();
  // const bookedDates = getBookedDatesByCabinId(params.cabinId);

  // We do like below bcz if one is fetching the data then other have to wait, eg: if getCabin(params.cabinId) is fetching the data and it takes 2 second then other have to wait 2 second before execution and with Promise.all will run all the fetch in parallel but we can do more better like move this fetch to a seperate component where they need to be called seperately instead of fetching data on parent
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinId),
  // ]);

  //   console.log(params); // { cabinId: '29' }
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        {/* Below is called as streaming so, it will not block the whole page and only show loader when in the below part */}
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
