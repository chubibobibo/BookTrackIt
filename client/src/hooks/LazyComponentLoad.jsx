import { useEffect, useState, useRef } from "react";
import ComponentLoading from "../components/ComponentLoading";
import { Spinner } from "@material-tailwind/react";

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
    <div ref={ref} className='flex items-end justify-center'>
      <div className='h-22 w-22 flex justify-center items-end'>
        <Spinner className='h-12 w-12' color='indigo' />
      </div>
    </div>
  );
}
export default LazyComponentLoad;
