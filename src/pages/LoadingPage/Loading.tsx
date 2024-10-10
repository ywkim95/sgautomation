import styles from "./loading.module.scss";
const Loading = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.spinner}></div>
      <div>Loading...</div>
    </div>
  );
};

export default Loading;
