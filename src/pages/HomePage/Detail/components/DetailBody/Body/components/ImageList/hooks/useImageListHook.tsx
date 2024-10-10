import useDetailStore from "../../../../../../store/useDetailStore.ts";
import { useCallback, useEffect, useRef, useState } from "react";

const useImageListHook = () => {
  const { detail } = useDetailStore();
  const imageUrls = [detail?.rgb, detail?.nir1, detail?.nir2].filter(
    Boolean,
  ) as string[];

  const imageListRef = useRef<HTMLDivElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [startX, setStartX] = useState(0); // 터치 시작 x 좌표
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const preloadImages = (imageArray: string[]) => {
    imageArray.forEach((image) => {
      const newImage = new Image();
      newImage.src = image;
    });
  };
  const btnClickEvent = (index: number) => {
    setImageIndex(index);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setCurrentTranslate(prevTranslate);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - startX;
    setCurrentTranslate(prevTranslate + deltaX);
  };

  const handleTouchEnd = () => {
    const endTranslate = currentTranslate;
    if (Math.abs(endTranslate - prevTranslate) > 50) {
      // 스와이프 거리에 따라 다음/이전 이미지 결정
      if (endTranslate < prevTranslate) {
        // 왼쪽 스와이프
        onClickNext();
      } else {
        // 오른쪽 스와이프
        onClickPrev();
      }
    } else {
      setCurrentTranslate(prevTranslate); // 원위치
    }
  };

  useEffect(() => {
    if (imageListRef.current) {
      imageListRef.current.addEventListener("touchstart", handleTouchStart);
      imageListRef.current.addEventListener("touchmove", handleTouchMove);
      imageListRef.current.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (imageListRef.current) {
        imageListRef.current.removeEventListener(
          "touchstart",
          handleTouchStart,
        );
        imageListRef.current.removeEventListener("touchmove", handleTouchMove);
        imageListRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [handleTouchEnd, handleTouchMove, handleTouchStart]);

  useEffect(() => {
    preloadImages(imageUrls);
  }, [imageUrls]);

  const onClickPrev = useCallback(() => {
    const newIndex = imageIndex === 0 ? imageUrls.length - 1 : imageIndex - 1;
    updateImageIndex(newIndex);
  }, [imageIndex, imageUrls.length]);

  const onClickNext = useCallback(() => {
    const newIndex = imageIndex === imageUrls.length - 1 ? 0 : imageIndex + 1;
    updateImageIndex(newIndex);
  }, [imageIndex, imageUrls.length]);

  const updateImageIndex = useCallback((newIndex: number) => {
    setImageIndex(newIndex);
    setPrevTranslate(-(newIndex * window.innerWidth));
  }, []);

  return {
    imageIndex,
    imageUrls,
    imageListRef,
    btnClickEvent,
    onClickNext,
    onClickPrev,
  };
};

export default useImageListHook;
