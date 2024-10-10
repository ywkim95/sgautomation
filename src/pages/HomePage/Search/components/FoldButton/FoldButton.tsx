import styles from "./FoldButton.module.scss";
import useFoldStateStore from "./stores/useFoldStateStore";

const FoldButton = () => {
  const { isFold, toggleFold } = useFoldStateStore();
  const className = `${styles.fileList__foldBtn}  ${isFold ? styles.folded : ""}`;
  return (
    <button
      className={className}
      onClick={toggleFold}
    ></button>
  );
};

export default FoldButton;
