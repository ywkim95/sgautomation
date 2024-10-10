import {
  ReAnalyzeStatus,
  Status,
} from "../../../../../../../../common/constants/Enum.ts";
import { Result } from "../../../../../models/Result.model.ts";

const filter = (list: Result[], name: string): Result[] => {
  if (name === ReAnalyzeStatus.newAnalyzeCall) {
    return list.filter((item) => item.analyzeStatus !== Status.analyzed);
  } else if (name === ReAnalyzeStatus.reAnalyzeCall) {
    return list.filter((item) => item.analyzeStatus === Status.analyzed);
  } else {
    return list;
  }
};

export default filter;
