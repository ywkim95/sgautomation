import useZIndexStore from "../../../../../common/stores/useZIndexStore";
import useSearchHandlerStore from "../../store/useSearchHandlerStore";
import SearchListArea from "./SeachList/SearchListArea";
import SearchButton from "./SearchButton/SearchButton";
import SearchFilter from "./SearchFilter/SearchFilter";
import styles from "./SearchBody.module.scss";

const SearchBody = () => {
  const { show } = useSearchHandlerStore();
  const { isZIndexZero } = useZIndexStore();
  const zIndex = isZIndexZero ? 0 : 100;
  return (
    <section
      className={styles.search__table}
      style={{ zIndex }}
    >
      {!show && <SearchFilter />}
      <SearchListArea />
      {show && <SearchButton />}
    </section>
  );
};

export default SearchBody;
