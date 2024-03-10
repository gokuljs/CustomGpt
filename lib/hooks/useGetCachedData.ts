const useGetCachedData = () => {
  const localeStorageKey = process.env.LOCAL_STORAGE_KEY;
  if (typeof window === "undefined" || !localeStorageKey) {
    return null;
  }
  return localStorage.getItem(localeStorageKey);
};

export default useGetCachedData;
