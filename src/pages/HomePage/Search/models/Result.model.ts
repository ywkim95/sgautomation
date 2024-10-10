import { ResponseResult } from "./ResponseResult.model.ts";

export interface Result extends ResponseResult {
  selected: boolean;
  clickedDetail: boolean;
}
