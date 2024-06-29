// error boundary should always be a client component, by writing error.js file in root this will work in the whole app, it will be rendered whenever there is an error in the app
// this component gets 2 argument by dfault 1st is the error message and 2nd is function which can be used to reset the error, error in the callback function is not caught in this, it will catch error which occur during rendering, it does not catch error which occur in root layout
"use client";
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}!</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
