"use client";
import { Input } from "@/components/ui/input";
import { CircleOff, SendHorizontal } from "lucide-react";
import OpenAI from "openai";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatLabel from "./_components/chatLabel";
import submitModelRequest from "@/lib/modelRequest";
import Chat from "./_components/Chat";
import useZoomReset from "@/lib/useZoomReset";
import { uuid } from "uuidv4";
import useStoreMessagesInStore from "@/lib/useStoreMessagesInStore";
import useGetAllMessages from "@/lib/useGetAllMessagesData";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const abortControllerRef = useRef(new AbortController());
  const [messages, setMessages] = useState<
    OpenAI.Chat.ChatCompletionMessageParam[]
  >([]);
  const idRef = useRef(uuid());
  useStoreMessagesInStore(messages, idRef.current);
  const data = useGetAllMessages();
  console.log(data);

  useZoomReset();
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      } else if (event.key === "Enter" && currentQuestion.length) {
        handleSearchButtonClick(currentQuestion);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentQuestion, handleSearchButtonClick]);

  const onAbortFetch = useCallback((): void => {
    abortControllerRef.current.abort();
    setLoading(false);
  }, []);

  return (
    <main className="h-[100%] w-[100%] flex flex-col pr-1 mb:pr-0 justify-between">
      <div className="w-full h-full flex justify-center items-center overflow-y-auto overflow-x-hidden mb-3">
        {messages.length === 0 && <ChatLabel />}
        {messages.length > 0 && (
          <Chat message={messages} isLoading={isLoading} />
        )}
      </div>

      <div className="h-[80px] flex flex-col gap-1 py-1 justify-center items-center ">
        <div className="flex justify-start items-center lg:w-[50%] w-[100%] px-4 lg:px-0 gap-3">
          <Input
            ref={inputRef}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            className="w-[calc(100% - 40px)] px-3 py-3 placeholder:text-zinc-600 placeholder:font-light"
            placeholder="Start your conversation here..."
            value={currentQuestion}
          />
          {isLoading ? (
            <CircleOff
              color="red"
              className="cursor-pointer  w-[30px] h-[30px]"
              onClick={onAbortFetch}
            />
          ) : (
            <SendHorizontal
              className="w-10% cursor-pointer text-zinc-400 w-[30px] h-[30px] dark:text-zinc-600"
              onClick={() => {
                currentQuestion.length > 0 &&
                  handleSearchButtonClick(currentQuestion);
              }}
            />
          )}
        </div>
        <div className="sm:text-xs text-[10px] font-light text-zinc-600">
          CustomGpt can make mistakes. Consider checking important information.
        </div>
      </div>
    </main>
  );
}
