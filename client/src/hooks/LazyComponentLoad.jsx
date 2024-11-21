import { useEffect, useState, useRef } from "react";
import ComponentLoading from "../components/ComponentLoading";

function LazyComponentLoad({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  //   console.log(isVisible);
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 } // Adjust threshold as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
        observer.disconnect();
      }
    };
  }, []);

  // return <div ref={ref}>{isVisible ? children : null}</div>;
  return isVisible ? (
    <div>{children}</div>
  ) : (
    <div ref={ref}>
      <ComponentLoading />
    </div>
  );
}
export default LazyComponentLoad;
