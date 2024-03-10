import OpenAI from "openai";
import React from "react";
import MarkDownSyntaxHighlighter from "./MarkDownSyntaxHighlighter";

export interface ChatModelProps {
  message: OpenAI.Chat.ChatCompletionMessageParam[];
  isLoading: boolean;
}

const Chat: React.FC<ChatModelProps> = ({ message, isLoading }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-full lg:w-[80%] w-[100%] px-10 py-10 flex flex-col gap-4  h-[calc(100% - 80px)]">
        {message.map((item, index) => (
          <MarkDownSyntaxHighlighter
            key={index}
            content={item?.content ? (item.content as string) : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Chat;
