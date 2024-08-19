import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">This Cabin cannot be found :( </h1>
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

// In Next.js the not-found page can actually be shown in two ways . First an automatic way , Simply if the URL doesn't exist and the
// second one is , we can manually basically trigger this "not-found" page by calling the notFound() function
