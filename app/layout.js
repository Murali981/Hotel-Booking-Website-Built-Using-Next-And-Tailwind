import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

// The above layout page is shared across the UserInterface(UI) among all the pages.

import "@/app/_styles/globals.css";

// Next.js allows us to do is to very easily and automatically self-host any google font that we want without the font
// being downloaded from google and this is really amazing because it will prevent layout shifts and improve performance
// and even privacy. So maybe you are aware that if we use fonts from google fonts , which is not good for privacy and might
// be even a problem with GDPR regulation and also it is not so good for performance because these fonts (or) the files
// for the fonts has to be downloaded from a google server. So it is always best to actually have those files right on
// your own server because that will make downloading them a lot faster and therefore improving performance and preventing
// layout shifts.

import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis", // We can export this metadata constant to give a title for our project . After exporting this metadata as a title , We can
    // see "The Wild Oasis" title in the browser tab rather than "localhost:3000". Now we have added an extra feature to the metadata object
    // which is template where in %s it replaces the  title with the "title" that is exported in the individual pages. Let us say we have
    // given title as "Cabins" to the cabins page. So when we click on the cabins route "localhost:3000/cabins" it will display
    // "Cabins / The Wild Oasis" on the browser's tab.
  },
  description:
    "Luxurious cabin hotel , located in the heart of Indian city  Delhi , Sorrounded  by beautiful mountains and dark forests", // This will
  // give description about your website which helps when google is indexing your website which helps in SEO optimization
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} antialiased  bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className=" max-w-7xl  mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
            {/* In the above <ReservationProvider></ReservationProvider> is a client component and the above children is the page
             component  of whatever page that we are visiting. and the {children} is the server component . We will pass a server
              component to the client component . In the above ,  {children} are already have been generated and also rendered 
               on the server  */}
          </main>
        </div>
      </body>
    </html>
  );
}
