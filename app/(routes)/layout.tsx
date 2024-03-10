import { ModeToggle } from "@/components/mode-toggle";
import React from "react";

interface HomePageProps {
  children: React.ReactNode;
}

const layout: React.FC<HomePageProps> = ({ children }) => {
  return (
    <div className="h-[100vh] w-[100vw] flex">
      <aside className="px-3 py-3 mobile lg:block hidden">
        <ModeToggle />
      </aside>
      <main className="h-full w-full">{children}</main>
    </div>
  );
};

export default layout;
