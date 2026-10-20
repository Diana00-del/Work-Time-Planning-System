
export interface LocalStorage {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
}

export default function useLocalStorage(): LocalStorage {
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  }

  const getItem = (key: string) => {
    return localStorage.getItem(key);
  }

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  }

  return {
    setItem,
    getItem,
    removeItem
  }
}