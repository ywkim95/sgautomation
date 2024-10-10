import useListHeaderHook from "./hooks/useListHeaderHook.tsx";
import styles from "./SearchResultListHeader.module.scss";
import HeaderCell from "./components/HeaderCell.tsx";
import useSearchHandlerStore from "../../../../store/useSearchHandlerStore.ts";
import useFoldStateStore from "../../../FoldButton/stores/useFoldStateStore.ts";
const SearchResultListHeader = () => {
  const { allChecked, checkHandler } = useListHeaderHook();
  const { show } = useSearchHandlerStore();
  const { isFold } = useFoldStateStore();
  
  const className = `${styles.search__filter}  ${isFold ? styles.folded : ""}`;
  
  // TODO: HeaderCell 별 정렬 기능 추가 필요

  return (
    <div className={className}>
      <div className={styles.search__status}>
        {show && (
          <input type="checkbox" checked={allChecked} onChange={checkHandler} />
        )}
        <HeaderCell name="상태" sort="ASC" />
      </div>
      <div className={styles.search__breed}>
        <HeaderCell name="품종" sort="ASC" />
      </div>
      <div className={styles.search__date}>
        <HeaderCell name="촬영일시" sort="ASC" />
      </div>
    </div>
  );
};

export default SearchResultListHeader;
