"use client";
import OpenAI from "openai";
import { useEffect } from "react";

const saveDataToLocalStorage = (key: string, data = {}) => {
  if (typeof window !== "undefined" && key) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const getDataFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined" && key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

interface LocalStorageProps {
  id: string;
  messages: OpenAI.Chat.ChatCompletionMessageParam[];
}

const useStoreMessagesInStore = (
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  id: string,
) => {
  useEffect(() => {
    const localStorageKey = process.env.LOCAL_STORAGE_KEY || "defaultKey";
    const fullKey = `${localStorageKey}`;
    let existingData: LocalStorageProps[] =
      getDataFromLocalStorage(fullKey) || [];
    if (existingData.length > 50) {
      existingData.splice(0, existingData.length);
    }
    if (messages.length > 1) {
      existingData = existingData.map((item) => {
        if (item.id === id) {
          return { id, messages: messages };
        } else {
          return item;
        }
      });
      saveDataToLocalStorage(fullKey, existingData);
    } else if (messages.length === 1) {
      const newData = { id: id, messages: messages };
      existingData = [newData, ...existingData];
      saveDataToLocalStorage(fullKey, existingData);
    }
  }, [messages, id]); // Dependencies: re-run this effect when messages or id changes
};

export default useStoreMessagesInStore;
