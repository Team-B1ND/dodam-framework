import { Link } from "@cher1shrxd/loading";
import type { Route } from "../types/route";

const Route = ({ href, title }: Route) => {
  return (
    <Link
      href={href}
      className="text-text-secondary hover:text-text-primary hover:bg-background-surface px-2 py-1 rounded-sm">
      {title}
    </Link>
  );
};

export default Route;
