import Logo from "@/components/logo";
import React from "react";

const ChatLabel = () => {
  return (
    <div className="w-[400px] h-[200px] flex flex-col items-center justify-center gap-4">
      <Logo />
      <p className="text-lg">How can I help you today?</p>
    </div>
  );
};

export default ChatLabel;
