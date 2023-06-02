import { useState, useRef, useEffect } from "react";

export const IntersectionComponent = (props: {
  options: IntersectionObserverInit;
  renderVisible?: React.ReactNode;
  renderNotVisible?: React.ReactNode;
}) => {
  const { options, renderVisible, renderNotVisible } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const callback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
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

  return <div ref={ref}>{isVisible ? renderVisible : renderNotVisible}</div>;
};
