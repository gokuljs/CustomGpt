import { ModeToggle } from "@/components/mode-toggle";
import React from "react";

interface HomePageProps {
  children: React.ReactNode;
}

const HomePageLayout: React.FC<HomePageProps> = ({ children }) => {
  return (
    <div className="h-[100%] w-[100%] flex">
      <aside className="px-3 py-3 mobile lg:block hidden">
        <ModeToggle />
      </aside>
      <main className="h-[100%] w-[100%]">{children}</main>
    </div>
  );
};

export default HomePageLayout;
