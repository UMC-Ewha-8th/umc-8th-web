export const useLocalStorage = (key: string) => {
  const getItem = (): string | null => {
    return localStorage.getItem(key);
  };

  const setItem = (value: string): void => {
    localStorage.setItem(key, value);
  };

  const removeItem = (): void => {
    localStorage.removeItem(key);
  };

  return { getItem, setItem, removeItem };
};
