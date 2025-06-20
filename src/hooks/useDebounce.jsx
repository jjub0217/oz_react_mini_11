import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function useDebounce(delay = 300) {
  const navigate = useNavigate();
  const timerRef = useRef(null); // useRef로 타이머 관리

  const debounce = (value) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      navigate(`/search?query=${value}`);
    }, delay);
  };

  return debounce;
}
