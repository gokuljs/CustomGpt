import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import History from "./_components/Drawer";

interface HomePageProps {
  children: React.ReactNode;
}

const HomePageLayout: React.FC<HomePageProps> = ({ children }) => {
  return (
    <div className="h-[100%] w-[100%] flex flex-col">
      <aside className="py-3 px-3 mobile flex gap-3 items-center justify-between h-[70px] z-10">
        <History />
        <ModeToggle />
      </aside>
      <main
        style={{
          height: "calc(100% - 60px)",
        }}
        className="w-[100%] "
      >
        {children}
      </main>
    </div>
  );
};

export default HomePageLayout;
