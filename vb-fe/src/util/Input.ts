import React, { useState } from "react";

const DEBOUNCE_TIME = 500;

export const useDebounce = () => {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const debounce = (inputValue: any, callback: any): void => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }

    setDebounceTimer(
      setTimeout(() => {
        if (inputValue && callback) {
          return callback();
        }
        return null;
      }, DEBOUNCE_TIME),
    );
  };

  return [debounce];
};
