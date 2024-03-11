import OpenAI from "openai";
import { create } from "zustand";

type MessagesStore = {
  messages: OpenAI.Chat.ChatCompletionMessageParam[];
  onUpdate: (messages: OpenAI.Chat.ChatCompletionMessageParam[]) => void;
  reset: boolean;
  onReset: (reset: boolean) => void;
};

const useMessageStore = create<MessagesStore>((set) => ({
  messages: [],
  onUpdate: (messages: OpenAI.Chat.ChatCompletionMessageParam[]) =>
    set({
      messages: messages,
    }),
  reset: true,
  onReset: (reset) => set({ reset: !reset }),
}));

export default useMessageStore;
