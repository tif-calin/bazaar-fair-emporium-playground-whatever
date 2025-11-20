import React from "react";

/**
 * ResizeObservers trigger a callback every time an element is resized.
 *
 * See also: MutationObserver, IntersectionObserver
 */
const useResizeObserver = <Element extends HTMLElement = HTMLElement>(
  callback: ResizeObserverCallback
) => {
  const ref = React.useRef<Element>(null);

  React.useLayoutEffect(() => {
    const element = ref.current;

    const resizeObserver = new ResizeObserver(callback);
    if (element) resizeObserver.observe(element);

    return () => {
      if (element) resizeObserver.unobserve(element);
      else resizeObserver.disconnect();
    };
  }, [callback]);

  return ref;
};

export default useResizeObserver;
