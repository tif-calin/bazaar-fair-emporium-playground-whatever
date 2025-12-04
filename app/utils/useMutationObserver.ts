import React from "react";

/**
 * MutationObservers trigger a callback every time an element is mutated.
 *
 * See also: ResizeObservers, IntersectionObserver
 */
const useMutationObserver = <Element extends HTMLElement = HTMLElement>(
  callback: (mutations: MutationRecord[], observer: MutationObserver, ref: Element | null) => void,
  options: MutationObserverInit = {}
) => {
  const ref = React.useRef<Element>(null);

  React.useEffect(() => {
    const element = ref.current;

    const observer = new MutationObserver((...args) => callback?.(...args, element));

    if (observer && element) {
      observer.observe(element, options);
      return () => observer.disconnect();
    }

    return undefined;
  }, [callback, options]);

  return ref;
};

export default useMutationObserver;
