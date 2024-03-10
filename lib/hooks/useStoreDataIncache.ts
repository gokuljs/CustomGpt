import OpenAI from "openai";
import React, { useEffect } from "react";

interface CacheMessageProps {
  id: string;
  messages: OpenAI.Chat.ChatCompletionMessageParam[];
}

const useStoreDataInCache = (
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  id: string
) => {
  useEffect(() => {
    const CACHE_MESSAGE_KEY = process.env.LOCAL_STORAGE_KEY;
    if (!CACHE_MESSAGE_KEY) return;
    const storedMessagesString = localStorage.getItem(CACHE_MESSAGE_KEY);
    const storedMessages: CacheMessageProps[] = storedMessagesString
      ? JSON.parse(storedMessagesString)
      : [];

    if (messages.length === 0) {
      const data = {
        id,
        messages: messages,
      };
      storedMessages.unshift(data);
      const serializedMessages = JSON.stringify(storedMessages);
      localStorage.setItem(CACHE_MESSAGE_KEY, serializedMessages);
    } else {
    }
  }, [messages, id]);
};

export default useStoreDataInCache;
