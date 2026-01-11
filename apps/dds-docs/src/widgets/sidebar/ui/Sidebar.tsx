"use client";

import { COMPONENT_ROUTES, ROUTES } from "../constants/routes";
import Route from "./Route";

const Sidebar = () => {
  return (
    <aside className="w-50 h-full fixed pt-16 overflow-y-scroll">
      <h2 className="text-text-placeholder text-sm mb-4">Indexes</h2>
      <nav className="flex flex-col border-l border-border-normal pl-2 pr-4">
        {ROUTES.map((route) => (
          <Route key={route.href} {...route} />
        ))}
      </nav>
      <h2 className="text-text-placeholder text-sm mt-16 mb-4">Components</h2>
      <nav className="flex flex-col border-l border-border-normal pl-2 pr-4">
        {COMPONENT_ROUTES.map((route) => (
          <Route key={route.href} href={route.href} title={route.name} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
