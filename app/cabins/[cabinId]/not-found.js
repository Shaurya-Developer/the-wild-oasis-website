import Link from "next/link";
// not-found.js is a convention, this component will render whenever there is not found url in the app, as this is in cabin route so it will work for all cabin and its children route and overwrite the global not-found.js
function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This cabin could not be found :(
      </h1>
      <Link
        href="/cabins"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Back to all cabins
      </Link>
    </main>
  );
}

export default NotFound;
