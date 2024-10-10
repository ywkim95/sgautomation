import styles from "./SearchLoading.module.scss";

const SearchLoading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner}></div>
      <div>로딩 중...</div>
    </div>
  );
};

export default SearchLoading;
