"use client";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import OpenAI from "openai";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatLabel from "./_components/chatLabel";
import submitModelRequest from "@/lib/modelRequest";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const abortControllerRef = useRef(new AbortController());
  const [messages, setMessages] = useState<
    OpenAI.Chat.ChatCompletionMessageParam[]
  >([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchButtonClick = useCallback(
    (currentQuestion: string) => {
      abortControllerRef.current = new AbortController();
      submitModelRequest(
        currentQuestion,
        messages,
        setMessages,
        setLoading,
        abortControllerRef.current
      );
      setCurrentQuestion("");
    },
    [messages]
  );

  console.log(messages, "ssss");

  useEffect(() => {}, []);
  return (
    <main className="h-full w-full flex flex-col justify-between">
      <div className="w-full h-full flex justify-center items-center">
        {messages.length === 0 && <ChatLabel />}
      </div>
      <div className="h-[80px] flex flex-col gap-1 py-1 justify-center items-center ">
        <div className="flex justify-start items-center w-[50%] gap-3">
          <Input
            ref={inputRef}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            className="w-[100%] px-3 py-3 placeholder:text-zinc-600 placeholder:font-light"
            placeholder="Start your conversation here..."
          />
          <SendHorizontal
            className="w-10% cursor-pointer"
            onClick={() => {
              currentQuestion.length > 0 &&
                handleSearchButtonClick(currentQuestion);
            }}
          />
        </div>
        <div className="text-xs font-light text-zinc-600">
          CustomGpt can make mistakes. Consider checking important information.
        </div>
      </div>
    </main>
  );
}
