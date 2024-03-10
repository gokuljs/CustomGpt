import OpenAI from "openai";
import React from "react";
import MarkDownSyntaxHighlighter from "./MarkDownSyntaxHighlighter";
import Logo from "@/components/logo";

export interface ChatModelProps {
  message: OpenAI.Chat.ChatCompletionMessageParam[];
  isLoading: boolean;
}

const Chat: React.FC<ChatModelProps> = ({ message, isLoading }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-full lg:w-[80%] w-[100%] px-10 py-10 flex flex-col gap-4  h-[calc(100% - 80px)]">
        {message.map((item, index) => (
          <div key={index} className="flex justify-start items-start gap-2">
            <div className="h-[40px] w-[40px]">
              {item.role === "assistant" && (
                <div className="rounded-full dark:bg-white bg-violet-200 flex items-center justify-center h-7 w-7">
                  <Logo width={20} height={20} />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div>{item.role}</div>
              <MarkDownSyntaxHighlighter
                key={index}
                content={item?.content ? (item.content as string) : ""}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
