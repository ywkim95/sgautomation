import styles from "./SearchResultList.module.scss";
import SearchResult from "../Result/SearchResult.tsx";
import { useEffect, useState } from "react";
import useScrollHook from "./hooks/useScrollHook.tsx";
import filter from "./functions/Filter.ts";
import useSearchResultListHook from "./hooks/useSearchResultListHook.tsx";
import SearchError from "../Error/SearchError.tsx";
import SearchLoading from "../Loading/SearchLoading.tsx";
import useSearchHandlerStore from "../../../../store/useSearchHandlerStore.ts";
import { Result } from "../../../../models/Result.model.ts";
import { useListStore } from "../../../../store/useListStore.ts";

const SearchResultList = () => {
  const [filteredList, setFilteredList] = useState<Result[]>([]);
  const { scrollRef } = useScrollHook();
  const { name, show } = useSearchHandlerStore();
  const { list } = useListStore((state) => state);
  const { isError, isPending, errorMessage, onClickRefresh } =
    useSearchResultListHook();

  const height = show ? "calc(100vh - 267px - var(--filter-height))" : "";
  const minHeight = show ? "calc(625px - var(--filter-height))" : "";

  useEffect(() => {
    if (list.length > 0) {
      const newList = filter(list, name);
      setFilteredList(newList);
    }
  }, [list, name]);

  if (isError) {
    return <SearchError onClick={onClickRefresh} message={errorMessage} />;
  }
  if (isPending) {
    return <SearchLoading />;
  }

  let content;

  if (filteredList.length > 0) {
    content = filteredList.map((result) => {
      return <SearchResult data={result} key={result.captureID} />;
    });
  } else {
    content = (
      <div className={styles.empty}>
        <span>조건에 맞는 항목이 없습니다.</span>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className={styles.search__rows}
      style={{ height, minHeight }}
    >
      {content}
    </div>
  );
};

export default SearchResultList;
