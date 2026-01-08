import { debounce } from "lodash";
import { useEffect, useState } from "react";

export function useDebounce(value: string = "", delay: number = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debouncedSetState = debounce(setDebouncedValue, delay);
    debouncedSetState(value);

    return () => {
      debouncedSetState.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
}
