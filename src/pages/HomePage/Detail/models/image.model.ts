export interface Image {
  rgb: string;
  nir1: string;
  nir2: string;
}
export interface ImageWithId extends Image {
  captureId: number;
}
