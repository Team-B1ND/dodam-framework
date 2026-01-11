"use client";

import { Link } from "@cher1shrxd/loading";
import type { Route } from "../types/route";
import { usePathname } from "next/navigation";

const Route = ({ href, title }: Route) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${isActive ? "text-brand-primary" : "text-text-secondary"} hover:text-text-primary hover:bg-background-surface px-2 py-1 rounded-sm`}>
      {title}
    </Link>
  );
};

export default Route;
