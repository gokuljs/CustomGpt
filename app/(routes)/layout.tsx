import React from "react";

interface HomePageProps {
  children: React.ReactNode;
}

const layout: React.FC<HomePageProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex">
      <aside className="px-1 py-1 min-w-2 border flex-col">
        <div>sds</div>
        <div>sds</div>
        <div>sds</div>
      </aside>
      <main>{children}</main>
    </div>
  );
};

export default layout;
