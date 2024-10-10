import { Status } from "../../../../common/constants/Enum.ts";
export interface SearchResponse {
  analyzeItems: ResponseResult[];
}
export interface ResponseResult {
  captureID: number;
  analyzeStatus: Status;
  crop: string;
  captureDate: string;
  // processNumber: string;
}
