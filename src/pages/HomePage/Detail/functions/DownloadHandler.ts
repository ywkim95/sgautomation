import { utils, write, writeFile } from "xlsx";
import Detail from "../models/Detail.model.ts";
import ExcelStructure from "../../../../common/constants/ExcelStructure.ts";
import { DateString } from "../../../../common/constants/Utils.ts";
import { Result } from "../../Search/models/Result.model.ts";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ImageDownloadProps from "../models/ImageDownloadProps.ts";
import { FileName } from "../../../../common/constants/Enum.ts";

const HandleExcelDownload = (detail: Detail, result: Result) => {
  const excelData = ExcelStructure(detail);

  const workSheet = utils.json_to_sheet(excelData);
  const workBook = utils.book_new();
  const dateString = DateString();

  utils.book_append_sheet(workBook, workSheet, `${dateString}`);

  // const fileName = `[${result.analyzeStatus}]${result.crop}_${result.processNumber}.xlsx`;
  const fileName = `[${result.analyzeStatus}]${result.crop}_${dateString}.xlsx`;

  writeFile(workBook, fileName);
};

const HandleExcelListDownload = async (
  detailList: Detail[],
  resultList: Result[],
) => {
  const zip = new JSZip();
  const newDate = new Date();
  const date = `${newDate.getFullYear()}${(newDate.getMonth() + 1).toString().padStart(2, "0")}${newDate.getDate().toString().padStart(2, "0")}`;

  detailList.forEach((detail, index) => {
    const excelData = ExcelStructure(detail);

    const workSheet = utils.json_to_sheet(excelData);
    const workBook = utils.book_new();
    const dateString = DateString();

    utils.book_append_sheet(workBook, workSheet, `${dateString}`);

    const result = resultList[index];
    // const fileName = `[${result.analyzeStatus}]${result.crop}_${result.processNumber}.xlsx`;
    const fileName = `[${result.analyzeStatus}]${result.crop}_${dateString}.xlsx`;

    const excelBuffer = write(workBook, { type: "file", bookType: "xlsx" });

    zip.file(fileName, excelBuffer, { binary: true });
  });

  const content = await zip.generateAsync({ type: "blob" });

  saveAs(content, `[${date}]자동생육측정시스템_엑셀리스트.zip`);
};

const HandleDownloadImageZip = async (
  blobs: Blob[],
  variables: ImageDownloadProps,
) => {
  return new Promise<void>((resolve, reject) => {
    const worker = new Worker(
      new URL("../../../../common/workers/zipWorker.ts", import.meta.url),
    );

    const fileNames = Object.values(FileName);

    worker.onmessage = (e) => {
      const { content, fileName } = e.data;
      saveAs(content, fileName);
      resolve();
    };

    worker.onerror = (e) => {
      console.error("Image zip worker error:", e);
      reject(e);
    };
    worker.postMessage({ blobs, variables, fileNames });

    // const zip = new JSZip();
    //
    // blobs.forEach((blob, index) => {
    //   const name = `[${result.analyzeStatus}]${result.crop}_${result.captureDate}_${fileNames[index]}.png`;
    //
    //   zip.file(name, blob);
    // });
    //
    // const content = await zip.generateAsync({ type: "blob" });
    //
    // saveAs(
    //   content,
    //   `[${result.analyzeStatus}]${result.crop}_${result.captureDate}.zip`,
    // );
  });
};

const HandleDownloadImageListZip = async (
  blobs: Blob[],
  variables: Result[],
) => {
  const zip = new JSZip();
  const fileNames = Object.values(FileName);
  const newDate = new Date();
  const date = `${newDate.getFullYear()}${(newDate.getMonth() + 1).toString().padStart(2, "0")}${newDate.getDate().toString().padStart(2, "0")}`;

  try {
    variables.forEach((result, index) => {
      const folder = zip.folder(
        `[${result.analyzeStatus}]${result.crop}_${result.captureDate}`,
      );
      fileNames.forEach((fileName, i) => {
        const name = `[${result.analyzeStatus}]${result.crop}_${result.captureDate}_${fileName}.bmp`;
        folder!.file(name, blobs[index * 3 + i]);
      });
    });
    const content = await zip.generateAsync({ type: "blob" });

    saveAs(content, `[${date}]자동생육측정시스템_이미지리스트.zip`);
  } catch (e) {
    console.error(e);
  }
};

const base64ToBlob = (base64: string, contentType: string = ""): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteNumbers.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

export {
  HandleExcelDownload,
  HandleExcelListDownload,
  HandleDownloadImageZip,
  HandleDownloadImageListZip,
  base64ToBlob,
};
