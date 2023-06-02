import { useEffect, useRef, useState } from "react";

export const useIntersection = (
  props: {
    options?: IntersectionObserverInit;
  } = {}
) => {
  const { options = { root: null } } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const [isVisiblePage, setIsVisiblePage] = useState<boolean>(true);

  const handleVisibilityChange = () => {
    setIsVisiblePage(!document.hidden);
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const callback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      setIsVisible(entry.isIntersecting);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return {
    isVisible: !isVisiblePage ? false : isVisible,
    ref,
    isVisiblePage,
    isVisibleElement: isVisible,
  };
};
