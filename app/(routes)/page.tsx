"use client";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import OpenAI from "openai";
import { useState } from "react";
import ChatLabel from "./_components/chatLabel";

export default function Home() {
  const [messages, setMessages] = useState<
    OpenAI.Chat.ChatCompletionMessageParam[]
  >([]);
  return (
    <main className="h-full w-full flex flex-col justify-between">
      <div className="w-full h-full flex justify-center items-center">
        <ChatLabel />
      </div>
      <div className="h-[80px] flex flex-col gap-1 py-1 justify-center items-center ">
        <div className="flex justify-start items-center w-[50%] gap-3">
          <Input
            className="w-[100%] px-3 py-3 placeholder:text-zinc-600 placeholder:font-light"
            placeholder="Start your conversation here..."
          />
          <SendHorizontal className="w-10% cursor-pointer" />
        </div>
        <div className="text-xs font-light text-zinc-600">
          CustomGpt can make mistakes. Consider checking important information.
        </div>
      </div>
    </main>
  );
}
