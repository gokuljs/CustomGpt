"use client";
import { useState, useEffect } from "react";
import useMessageStore from "./useStoreMessages";
import OpenAI from "openai";

// Utility function to get data from localStorage
const getDataFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined" && key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  }
  return {};
};

export interface MessageProps {
  id: string;
  messages: OpenAI.Chat.ChatCompletionMessageParam[];
}

// Hook to get all messages
const useGetAllMessages = (): MessageProps[] => {
  const localStorageKey = process.env.LOCAL_STORAGE_KEY || "defaultKey";
  const [mounted, setIsMounted] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const { messages: storeMessages } = useMessageStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const messages = getDataFromLocalStorage(localStorageKey);
      setAllMessages(messages);
    }
  }, [mounted, localStorageKey, storeMessages]);

  return allMessages;
};

export default useGetAllMessages;
