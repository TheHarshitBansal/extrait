import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-[200px] w-full flex items-end justify-center px-20 py-2 bg-gradient-to-b from-gray-50 to-rose-100">
      <span className="inline-flex items-center gap-x-1 font-bold text-rose-700 whitespace-nowrap">
        Made with ❤️ by{" "}
        <Link
          href={"https://harshitbansal.netlify.app"}
          target="_blank"
          className="inline-flex items-center gap-x-1 underline cursor-pointer"
        >
          Harshit Bansal <ExternalLink className="w-3 h-3" />
        </Link>
      </span>
    </div>
  );
};

export default Footer;
