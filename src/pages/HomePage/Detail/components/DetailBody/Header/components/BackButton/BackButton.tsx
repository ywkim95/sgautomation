import styles from "./BackButton.module.scss";
import buttonStyles from "../../../../../../../../common/scss/Button/Button.module.scss";
import useZIndexStore from "../../../../../../../../common/stores/useZIndexStore.ts";
import useSetNewListHook from "../../../../../../Search/hooks/useSetNewListHook.tsx";
const BackButton = () => {
  const { toggleZIndexZero } = useZIndexStore();
  const { resetDetailHandler } = useSetNewListHook();
  const onClick = () => {
    toggleZIndexZero();
    resetDetailHandler();
  };

  return (
    <span
      className={`${styles.panelHeader__backBtn} ${buttonStyles.btn}`}
      onClick={onClick}
    >
      ←
    </span>
  );
};

export default BackButton;
