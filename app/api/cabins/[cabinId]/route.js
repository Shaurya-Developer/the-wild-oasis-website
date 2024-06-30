// we should make a file route.js, for making api and this folder should not have page.js as it cannot send HTML and JSON at the same time
// export async function GET() {
//   return Response.json({ test: "test" });
// } // http://localhost:3000/api/cabins/76 we get json as {"test":"test"}

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params; // { cabinId: '76' }
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ message: "Cabin not found" });
  }
}
// we can only use HTTP verb like GET, POST, PATCH, DELETE etc
// export async function POST(){}
