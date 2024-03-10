const useGetCachedData = () => {
  const localeStorageKey = process.env.LOCAL_STORAGE_KEY;
  if (!localeStorageKey) return;
  return localStorage.getItem(localeStorageKey);
};

export default useGetCachedData;
