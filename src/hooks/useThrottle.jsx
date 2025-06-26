// hooks/useThrottleCallback.js
import { useRef } from "react";

export const useThrottle = (functionParameter, delay = 300) => {
  const time = useRef(null);

  const throttle = () => {
    if (time.current) return;

    time.current = true;
    functionParameter();

    setTimeout(() => {
      time.current = false;
    }, delay);
  };

  return throttle;
};
