import useSearchHandlerStore from "../../../store/useSearchHandlerStore.ts";
import styles from "./SearchButton.module.scss";
import buttonStyles from "../../../../../../common/scss/Button/Button.module.scss";
const SearchButton = () => {
  const { name, onClick } = useSearchHandlerStore();
  return (
    <div
      onClick={onClick}
      className={`${styles.selectBtn} ${buttonStyles.btn}`}
    >
      {name}
    </div>
  );
};

export default SearchButton;
