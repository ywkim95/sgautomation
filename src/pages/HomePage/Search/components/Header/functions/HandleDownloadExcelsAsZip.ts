import JSZip from "jszip";
import ExcelStructure from "../../../../../../common/constants/ExcelStructure.ts";
import { utils, write } from "xlsx";
import { DateString } from "../../../../../../common/constants/Utils.ts";
import { saveAs } from "file-saver";
import { Result } from "../../../models/Result.model.ts";
import { ResponseDetail } from "../../../../Detail/models/ResponseDetail.model.ts";

const HandleDownloadExcelsAsZip = async (
  model: { data: ResponseDetail[]; idList: number[] },
  list: Result[],
) => {
  const zip = new JSZip();

  const dateString = DateString();

  model.data.forEach((detail: ResponseDetail, index: number) => {
    const id = model.idList[index];
    const result = list[id];

    // const fileName = `[${result.analyzeStatus}]${result.crop}_${result.processNumber}.xlsx`;
    const fileName = `[${result.analyzeStatus}]${result.crop}.xlsx`;

    const excelData = ExcelStructure(detail);
    const workSheet = utils.json_to_sheet(excelData);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "Sheet1");

    const binaryString = write(workBook, { type: "binary", bookType: "xlsx" });
    const excelBlob = new Blob([s2ab(binaryString)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    zip.file(fileName, excelBlob);
  });

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, `excels_${dateString}.zip`);
  });
};

const s2ab = (str: string) => {
  const buffer = new ArrayBuffer(str.length);
  const view = new Uint8Array(buffer);

  for (let i = 0; i < str.length; i++) {
    view[i] = str.charCodeAt(i) & 0xff;
  }
  return buffer;
};

export default HandleDownloadExcelsAsZip;
