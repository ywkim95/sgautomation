import styles from "./SearchError.module.scss";
import buttonStyles from "../../../../../../../common/scss/Button/Button.module.scss";
const SearchError = ({
  onClick,
  message,
}: {
  onClick: () => void;
  message: string | null;
}) => {
  return (
    <div className={styles.error}>
      <div className={styles.error__message}>
        {message ? message : "에러가 발생했습니다."}
      </div>
      <button
        className={`${styles.refresh__btn} ${buttonStyles.btn}`}
        onClick={onClick}
      >
        재시도
      </button>
    </div>
  );
};

export default SearchError;
