import { useMutation } from "@tanstack/react-query";
import QK from "../../../../common/constants/QueryKey.const.ts";
import { ImageType } from "../../../../common/constants/Enum.ts";
import { useListStore } from "../../Search/store/useListStore.ts";
import {
  base64ToBlob,
  HandleDownloadImageZip,
} from "../functions/DownloadHandler.ts";
import {
  downloadImageDetail,
  downloadJpegDetail,
} from "../../../../common/api/Http.ts";

const useDetailImageDownloadHook = () => {
  const { list } = useListStore((state) => state);
  const downloadQueryFn = async ({
    id,
    type,
  }: {
    id: number;
    type: ImageType;
  }) => {
    if (type === ImageType.original) {
      return await downloadImageDetail(id);
    } else {
      return await downloadJpegDetail(id);
    }
  };

  const { mutateAsync } = useMutation({
    mutationKey: [QK.imgDownload],
    mutationFn: ({ id, type }: { id: number; type: ImageType }) =>
      downloadQueryFn({ id, type }),
    onSuccess: async (value, variables) => {
      const result = list.find((item) => item.captureID === variables.id);

      if (!result) {
        alert("정상적인 경로로 다운로드를 시도해주세요.");
        return;
      }
      const imageList = [value.rgb, value.nir1, value.nir2];
      const contentType =
        variables.type === ImageType.original ? "image/png" : "image/jpeg";

      const base64ToBlobs = await Promise.all(
        imageList.map((image) => base64ToBlob(image, contentType)),
      );

      await HandleDownloadImageZip(base64ToBlobs, {
        result,
        type: variables.type,
      });
    },
    retry: false,
  });

  const downloadImage = async ({
    id,
    type,
  }: {
    id: number;
    type: ImageType;
  }) => {
    return await mutateAsync({ id, type });
  };

  return { downloadImage };
};

export default useDetailImageDownloadHook;
