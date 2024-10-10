import styles from "./DetailError.module.scss";
import useDetailStore from "../../../../store/useDetailStore.ts";

const DetailError = () => {
  const { detail } = useDetailStore();
  return (
    <div
      className={`${styles.detail__error} ${detail?.errorCode ? styles.failedResult : styles.completedResult}`}
    >
      <div className={styles.detail__errorIcon}></div>
      <span className={styles.detail__errorType}>{detail?.errorCode}</span>
    </div>
  );
};

export default DetailError;
