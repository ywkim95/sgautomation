import { useEffect, useRef } from "react";
import { usePaginationStore } from "../../../../../store/usePaginationStore.ts";
import useSearchHandlerStore from "../../../../../store/useSearchHandlerStore.ts";
import throttle from "lodash.throttle";

const useScrollHook = () => {
  const { paginationBody, setPaginationBody } = usePaginationStore();

  const { show } = useSearchHandlerStore();

  const scrollRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const handleScroll = throttle((e: Event) => {
      const target = e.target as HTMLTableSectionElement;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        // TODO: Load more data
        setPaginationBody({
          ...paginationBody,
          startIndex: paginationBody.startIndex + paginationBody.count,
        });
      }
    }, 500);
    const currentRef = scrollRef.current;

    if (currentRef && !show) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
        handleScroll.cancel();
      }
    };
  }, [paginationBody, show]);

  return { scrollRef };
};

export default useScrollHook;
