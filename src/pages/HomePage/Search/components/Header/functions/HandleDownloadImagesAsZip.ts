import JSZip from "jszip";
import { saveAs } from "file-saver";
import { DateString } from "../../../../../../common/constants/Utils.ts";
import { Result } from "../../../models/Result.model.ts";
import { ImageWithId } from "../../../../Detail/models/image.model.ts";
import { base64ToBlob } from "../../../../Detail/functions/DownloadHandler.ts";

const HandleDownloadImagesAsZip = async (
  model: {
    data: ImageWithId[];
    idList: number[];
  },
  list: Result[],
) => {
  const zip = new JSZip();
  const dateString = DateString();

  for (const [index, value] of model.data.entries()) {
    const images = Object.keys(value);
    const imageList = [value.rgb, value.nir1, value.nir2];
    const base64Images = await Promise.all(
      imageList.map((image) => base64ToBlob(image, "image/bmp")),
    );
    const id = model.idList[index];
    const result = list[id];
    const rgb = `[${result.analyzeStatus}]${result.crop}_${images[1]}.bmp`;
    const nir1 = `[${result.analyzeStatus}]${result.crop}_${images[2]}.bmp`;
    const nir2 = `[${result.analyzeStatus}]${result.crop}_${images[3]}.bmp`;

    zip.file(rgb, base64Images[0]);
    zip.file(nir1, base64Images[1]);
    zip.file(nir2, base64Images[2]);
  }

  // model.data.forEach((value: ImageWithId, index: number) => {
  //   const images = Object.keys(value);
  //   const imageList = [value.rgb, value.nir1, value.nir2];
  //   const base64Images = await Promise.all(
  //     imageList.map((image) => base64ToBlob(image, "image/bmp")),
  //   );
  //   const id = model.idList[index];
  //   const result = list[id];
  //
  //   // const fileName = `[${result.analyzeStatus}]${result.crop}_${result.processNumber}.png`;
  //   const rgb = `[${result.analyzeStatus}]${result.crop}_${images[1]}.bmp`;
  //   const nir1 = `[${result.analyzeStatus}]${result.crop}_${images[2]}.bmp`;
  //   const nir2 = `[${result.analyzeStatus}]${result.crop}_${images[3]}.bmp`;
  //
  //   // const fileName = `image_${index + 1}.png`;
  //
  //   zip.file(rgb, base64Images[0]);
  //   zip.file(nir1, base64Images[1]);
  //   zip.file(nir2, base64Images[2]);
  // });

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, `images_${dateString}.zip`);
  });
};

export default HandleDownloadImagesAsZip;
