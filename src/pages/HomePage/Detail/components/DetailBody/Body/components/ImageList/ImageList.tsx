import styles from "./ImageList.module.scss";
import useFoldStateStore from "../../../../../../Search/components/FoldButton/stores/useFoldStateStore.ts";
import ImageSlider from "./components/ImageSlider.tsx";
import useImageListHook from "./hooks/useImageListHook.tsx";
import { ImageName } from "../../../../../../../../common/constants/Enum.ts";

const ImageList = () => {
  const { isFold } = useFoldStateStore();

  const {
    imageUrls,
    imageListRef,
    btnClickEvent,
    onClickNext,
    onClickPrev,
    imageIndex,
  } = useImageListHook();

  const className = `${styles.panelBody__imageWrap} ${isFold ? styles.folded : ""} ${styles.disableSelect}`;

  return (
    <div className={className}>
      <div className={styles.panelBody__image}>
        {imageUrls.length > 0 ? (
          <>
            <div
              ref={imageListRef}
              className={styles.panelBody__imageContainer}
              style={{ transform: `translateX(${-(imageIndex * 100)}%)` }}
            >
              {imageUrls.map((image, index) => (
                <img
                  key={index + image.substring(0, 20)}
                  src={`data:image/jpg;base64,${image}`}
                  alt="profile"
                />
              ))}
            </div>
            <ImageSlider onClickNext={onClickNext} onClickPrev={onClickPrev} />
            <div className={styles.panelBody__imageName}>
              {Object.values(ImageName)[imageIndex]}
            </div>
            <div className={styles.panelBody__imageSelect}>
              {imageUrls.map((image, index) => {
                const imageClassName = `${index === imageIndex ? styles.selected : ""}`;
                return (
                  <div
                    key={`${image + index}`}
                    className={imageClassName}
                    onClick={() => btnClickEvent(index)}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className={styles.empty}>이미지가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default ImageList;
