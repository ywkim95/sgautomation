import SearchHeader from "./components/Header/SearchHeader.tsx";
import useFoldStateStore from "./components/FoldButton/stores/useFoldStateStore.ts";
import styles from "./Search.module.scss";
import FoldButton from "./components/FoldButton/FoldButton.tsx";
import SearchBody from "./components/Body/SearchBody.tsx";
const Search = () => {
  const { isFold } = useFoldStateStore();
  const className = `${styles.search} ${isFold ? styles.folded : ""}}`;
  
  return (
    <section className={className}>
      <SearchHeader />
      <SearchBody />
      <FoldButton />
    </section>
  );
};

export default Search;
