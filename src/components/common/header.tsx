import { FileSignatureIcon } from "lucide-react";
import Navlink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./PlanBadge";

const Header = () => {
  const isLoggedIn = false;
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto ">
      <div className="flex lg:flex-1">
        <Navlink
          href={"/"}
          className="flex gap-x-1 lg:gap-x-2 items-center shrink-0 text-lg lg:text-xl"
        >
          <FileSignatureIcon className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />{" "}
          <span className="font-extrabold text-gray-900">Extrait</span>
        </Navlink>
      </div>
      <div className="flex lg:justify-center gap-x-4 lg:gap-x-12 lg:items-center">
        <Navlink href={"/#pricing"}>Pricing</Navlink>
        <SignedIn>
          <Navlink href={"/dashboard"}>Your Documents</Navlink>
        </SignedIn>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex items-center gap-x-2">
            <Navlink href={"/upload"}>Upload a PDF</Navlink>
            <PlanBadge />
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <Navlink href={"/sign-in"}>Sign In</Navlink>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;
