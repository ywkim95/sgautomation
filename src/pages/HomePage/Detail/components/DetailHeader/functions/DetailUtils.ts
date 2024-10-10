import { Status } from "../../../../../../common/constants/Enum.ts";

export const typeConverter = (type: Status) => {
  switch (type) {
    case Status.analyzed:
      return "분석완료";
    case Status.failed:
      return "분석실패";
    case Status.notAnalyzed:
      return "미분석";
  }
};

export const absToFixed = (a: number, b: number) => {
  return Math.abs(a - b).toFixed(2);
};
