"use client";
import { useState, useEffect } from "react";

// Utility function to get data from localStorage
const getDataFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined" && key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  }
  return {};
};

// Hook to get all messages
const useGetAllMessages = () => {
  const localStorageKey = process.env.LOCAL_STORAGE_KEY || "defaultKey";
  const [mounted, setIsMounted] = useState(false);
  const [allMessages, setAllMessages] = useState({});

  useEffect(() => {
    setIsMounted(true); // Set mounted to true after component mounts
  }, []);

  useEffect(() => {
    if (mounted) {
      // Only interact with localStorage if component is mounted (i.e., on the client-side)
      const messages = getDataFromLocalStorage(localStorageKey);
      setAllMessages(messages);
    }
  }, [mounted, localStorageKey]); // React to changes in `mounted` and `localStorageKey`

  // Return allMessages regardless of whether the component has mounted
  // This ensures that the return type of the hook is consistent
  return allMessages;
};

export default useGetAllMessages;
