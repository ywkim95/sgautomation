import { ImageType } from "../../../../common/constants/Enum.ts";
import { Result } from "../../Search/models/Result.model.ts";

type ImageDownloadProps = {
  result: Result;
  type: ImageType;
};

export default ImageDownloadProps;
