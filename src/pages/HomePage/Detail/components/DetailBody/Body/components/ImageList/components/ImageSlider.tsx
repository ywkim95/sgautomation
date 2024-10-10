import styles from "./ImageSlider.module.scss";
import useFoldStateStore from "../../../../../../../Search/components/FoldButton/stores/useFoldStateStore.ts";
const ImageSlider = ({
  onClickNext,
  onClickPrev,
}: {
  onClickPrev: () => void;
  onClickNext: () => void;
}) => {
  const { isFold } = useFoldStateStore();

  const PrevClassName = `${styles.panelBody__imageLeftBtn}  ${isFold ? styles.folded : ""}`;
  const NextClassName = `${styles.panelBody__imageRightBtn}  ${isFold ? styles.folded : ""}`;

  return (
    <div>
      <div className={PrevClassName} onClick={onClickPrev} />
      <div className={NextClassName} onClick={onClickNext} />
    </div>
  );
};

export default ImageSlider;
