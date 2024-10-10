import ButtonList from "./components/ButtonList.tsx";
import styles from "./SearchHeader.module.scss";
const SearchHeader = () => {
  // 다운로드 및 재분석 버튼 클릭 시 동작

  return (
    <header className={styles.search__header}>
      <span className={styles.search__headerTitle}>파일 목록</span>
      <ButtonList />
    </header>
  );
};

export default SearchHeader;
