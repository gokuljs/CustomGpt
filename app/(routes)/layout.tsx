import { ModeToggle } from "@/components/mode-toggle";
import React from "react";

interface HomePageProps {
  children: React.ReactNode;
}

const layout: React.FC<HomePageProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex">
      <aside className="px-3 py-3 min-w-2">
        <ModeToggle />
      </aside>
      <main>{children}</main>
    </div>
  );
};

export default layout;
