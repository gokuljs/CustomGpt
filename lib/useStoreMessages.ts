import OpenAI from "openai";
import { create } from "zustand";

type MessagesStore = {
  messages: OpenAI.Chat.ChatCompletionMessageParam[];
  onUpdate: (messages: OpenAI.Chat.ChatCompletionMessageParam[]) => void;
};

const useMessageStore = create<MessagesStore>((set) => ({
  messages: [],
  onUpdate: (messages: OpenAI.Chat.ChatCompletionMessageParam[]) =>
    set({
      messages: messages,
    }),
}));

export default useMessageStore;
