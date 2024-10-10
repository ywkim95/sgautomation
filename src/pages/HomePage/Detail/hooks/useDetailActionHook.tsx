import useDetailStore from "../store/useDetailStore.ts";
import useDetailImageDownloadHook from "./useDetailImageDownloadHook.tsx";
import { ImageType } from "../../../../common/constants/Enum.ts";
import { useCallback } from "react";
import useDetailAnalysisHook from "./useDetailAnalysisHook.tsx";
import {
  base64ToBlob,
  HandleDownloadImageZip,
  HandleExcelDownload,
} from "../functions/DownloadHandler.ts";

const useDetailActionHook = () => {
  const { detail, result } = useDetailStore((state) => state);
  const { getAnalyzeDetail } = useDetailAnalysisHook();
  const { downloadImage } = useDetailImageDownloadHook();

  const hasMessage =
    detail?.errorCode !== null && detail?.errorCode !== undefined;

  const onClickReanalysisDetail = useCallback(async () => {
    // TODO: 재분석 요청 API 호출 - /Detail/Analyze
    if (!result) return;

    await getAnalyzeDetail(result.captureID);
  }, [result, getAnalyzeDetail]);

  const onClickImgDownloadDetail = useCallback(
    async (type: ImageType) => {
      /**
       * TODO: 이미지 다운로드 API 호출
       * 원본: /Detail/Download/Image
       * 크롭(축소된 이미지): /Detail/Download/Jpeg
       */
      if (!result?.captureID) {
        alert("리스트 중 하나를 선택해 주세요!");
        return;
      }

      if (!detail) {
        alert("이미지가 없습니다.");
        return;
      }

      const image = await downloadImage({ id: result?.captureID, type });
      const imageList = [image.rgb, image.nir1, image.nir2];
      const contentType =
        type === ImageType.original ? "image/bmp" : "image/jpeg";
      const blobs = await Promise.all(
        imageList.map((image) => base64ToBlob(image, contentType)),
      );
      await HandleDownloadImageZip(blobs, { result, type });
    },
    [result?.captureID, downloadImage],
  );
  // const urlToBlob = async (url: string): Promise<Blob> => {
  //   const response = await api.get(url, { responseType: "blob" });
  //   if (response.status !== 200) {
  //     throw new Error("이미지 다운로드 실패");
  //   }
  //
  //   console.log(response);
  //
  //   const blob = await response.data;
  //   return blob;
  // };

  const onClickExcelDownloadDetail = useCallback(() => {
    // TODO: 엑셀/CSV 다운로드 API 호출 - /Detail/Download/Excel
    if (!detail || !result) {
      console.log("리스트 중 하나를 선택해 주세요!");
      return;
    }

    HandleExcelDownload(detail, result);
  }, [HandleExcelDownload]);

  return {
    onClickReanalysisDetail,
    onClickImgDownloadDetail,
    onClickExcelDownloadDetail,
    hasMessage,
  };
};

export default useDetailActionHook;
