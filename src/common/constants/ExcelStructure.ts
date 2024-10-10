import { ResponseDetail } from "../../pages/HomePage/Detail/models/ResponseDetail.model.ts";

const ExcelStructure = (detail: ResponseDetail) => {
  return [
    ["구분", "실측값", "분석값", "오차"],
    [
      "초장 (mm)",
      detail.measurementReal,
      detail.measurementAnalysis || "-",
      detail.measurementAnalysis !== null &&
      detail.measurementAnalysis !== undefined
        ? detail.measurementReal - detail.measurementAnalysis
        : "-",
    ],
    [
      "엽면적 (mm²)",
      detail.leafAreaReal,
      detail.leafAreaAnalysis || "-",
      detail.leafAreaAnalysis !== null && detail.leafAreaAnalysis !== undefined
        ? detail.leafAreaReal - detail.leafAreaAnalysis
        : "-",
    ],
    [
      "균일도",
      detail.uniformityReal,
      detail.uniformityAnalysis || "-",
      detail.uniformityAnalysis !== null &&
      detail.uniformityAnalysis !== undefined
        ? detail.uniformityReal - detail.uniformityAnalysis
        : "-",
    ],
  ];
};

export default ExcelStructure;
