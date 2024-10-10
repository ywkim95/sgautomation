import JSZip from "jszip";
import ImageDownloadProps from "../../pages/HomePage/Detail/models/ImageDownloadProps.ts";
import { DateString } from "../constants/Utils.ts";

self.onmessage = async (
  e: MessageEvent<{
    blobs: Blob[];
    variables: ImageDownloadProps;
    fileNames: string[];
  }>,
) => {
  const { blobs, variables, fileNames } = e.data;
  const zip = new JSZip();

  const { result } = variables;
  const dateString = DateString();

  blobs.forEach((blob: Blob, index: number) => {
    const name = `[${result.analyzeStatus}]${result.crop}_${result.captureDate}_${fileNames[index]}_${dateString}.bmp`;

    zip.file(name, blob);
  });

  const content = await zip.generateAsync({ type: "blob" });

  self.postMessage({
    content,
    fileName: `[${result.analyzeStatus}]${result.crop}_${result.captureDate}.zip`,
  });
};
