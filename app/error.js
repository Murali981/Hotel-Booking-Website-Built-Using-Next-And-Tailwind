"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}

// The above global error component can be named anything but the name error makes sense here . So this Error({error , reset}) will
// get the error object itself plus a function that we can call to reset the error boundary . So that clicking , So that the action
// basically is something interactive which can only happen in a client component.

// This error.js global error file doesnot catch errors that might happen in the root layout.
