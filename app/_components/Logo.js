import Image from "next/image";
import Link from "next/link";
import logo from "@/public/Logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image src="/icon.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      {/* The above Image component is given by next.js where it will do three things out of the box.
       First thing is , It will automatically serve correctly sized images in modern formats for example WebP. It will also do this only on demand.
      Second thing is , this image component prevents layout shifts because it forces us to specify the exact height and width
      Third thing is , it also automatically  lazy loads the images only  when they actually enter the view port. */}
      <Image
        src={logo}
        height="60"
        width="60"
        quality={100}
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
