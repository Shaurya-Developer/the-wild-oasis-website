import Logo from "@/app/./_components/Logo"; // we can also import like this where @/ is the root
import Navigation from "./_components/Navigation";

import { Josefin_Sans } from "next/font/google"; // we can import any google font in this way

const Josefin = Josefin_Sans({
  subsets: ["latin"], // if we are using english latin is the subset
  display: "swap", // firstly normal font will be shown and when Josefin_Sans is ready it will be shown
}); // it will return a object which will have a classname so if we use that classname in the body , it will be imported in the whole app

import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / The Wild Oasis", // %s will be replaced by the title we exported in the individual pages
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin gotel located in the heart of the Italian Dolomites, surrounded by beautiful mountain and dark forests", // Used for SEO, it is meta description used in the HTML
  // We can give favicon in nextjs simply by putting the image in the app folder and it should be named as icon like icon.png
}; // we can give title of the page like this, we don't havr to put title in the html, it is an convention in next js to give title like this

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-100 min-h-screen ${Josefin.className} antialiased flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
