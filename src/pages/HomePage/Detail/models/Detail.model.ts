import { Image } from "./image.model.ts";
import { ResponseDetail } from "./ResponseDetail.model.ts";

interface Detail extends Image, ResponseDetail {}

export default Detail;
