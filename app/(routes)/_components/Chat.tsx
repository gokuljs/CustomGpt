import OpenAI from "openai";
import React from "react";

export interface ChatModelProps {
  message: OpenAI.Chat.ChatCompletionMessageParam[];
}

const Chat: React.FC<ChatModelProps> = () => {
  return <div className="h-full w-full">Hello world</div>;
};

export default Chat;
