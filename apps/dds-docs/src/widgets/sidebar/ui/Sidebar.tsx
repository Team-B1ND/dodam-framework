"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { COMPONENT_ROUTES, ROUTES } from "../constants/routes";
import Route from "./Route";
import { useSidebarStore } from "@/shared/stores/useSidebarStore";

const NAV_STYLES = "flex flex-col border-l border-border-normal pl-2 pr-4 ml-4 md:ml-0";
const SECTION_TITLE_STYLES = "text-text-placeholder text-sm mb-4 px-4 md:px-0";

interface NavSectionProps {
  title: string;
  className?: string;
}

const NavSection = ({ title, children, className = "" }: React.PropsWithChildren<NavSectionProps>) => (
  <div className={className}>
    <h2 className={SECTION_TITLE_STYLES}>{title}</h2>
    <nav className={NAV_STYLES}>{children}</nav>
  </div>
);

const Sidebar = () => {
  const pathname = usePathname();
  const { isOpen, close } = useSidebarStore();

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={close}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-40 w-50 h-dvh pt-16
          overflow-y-auto bg-background-default
          transition-transform duration-300 ease-in-out
          md:left-auto md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
        <div className="flex items-center justify-between px-4 py-2 md:hidden">
          <span className="text-text-primary font-semibold">메뉴</span>
          <button
            type="button"
            onClick={close}
            className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-fill-secondary cursor-pointer"
            aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <div className="pb-8">
          <NavSection title="Indexes">
            {ROUTES.map((route) => (
              <Route key={route.href} {...route} />
            ))}
          </NavSection>

          <NavSection title="Components" className="mt-16">
            {COMPONENT_ROUTES.map((route) => (
              <Route key={route.href} href={route.href} title={route.name} />
            ))}
          </NavSection>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
