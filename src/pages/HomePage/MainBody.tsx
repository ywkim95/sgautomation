import styles from "./Home.module.scss";
import Search from "./Search/Search.tsx";
import Detail from "./Detail/Detail.tsx";
import useFoldStateStore from "./Search/components/FoldButton/stores/useFoldStateStore.ts";

const MainBody = () => {
  const { isFold } = useFoldStateStore();
  const className = `${styles.main} ${isFold ? styles.folded : ""}`;
  return (
    <main className={className}>
      <Search/>
      <Detail/>
    </main>
  );
};

export default MainBody;
