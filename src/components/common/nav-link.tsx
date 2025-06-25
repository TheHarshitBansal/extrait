"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navlink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        className,
        "transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500",
        isActive && "text-rose-500 font-semibold"
      )}
    >
      {children}
    </Link>
  );
};

export default Navlink;
