import { useEffect } from "react";

/**
 * Hook that triggers a callback when a click is detected outside the given element.
 * @param ref - Ref of the element to detect outside clicks.
 * @param callback - Function to call when an outside click occurs.
 */
const useOutsideClick = (ref: React.RefObject<HTMLElement| null>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

export default useOutsideClick;
