import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth(); // This auth function which we have exported from the auth.js file will return session details of the
  // user and also remember when we do session = await auth() in any component then this will make the entire route dynamic because
  // this authentication works with cookies and headers and so this auth() function needs to read the cookies from the incoming
  // headers and reading the  cookies actually switches the route to dynamic rendering because , ofcourse these cookies can only be
  // known at the runtime and cookies cannot be known at the build time. So if we just statically built this site then we cannot know
  // the users that might eventually be logged in . So this route needs to be dynamic. Now in this situation we are calling this
  // auth() function in the navigation which is a part of the layout and this layout is a part of every single route then it makes it
  // so that our entire website becomes dynamic . So every single route in this website is dynamic because of the image beside the
  // guest area which is coming because of calling the auth() function.
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <span>Guest area</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
