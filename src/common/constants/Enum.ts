export enum ImageType {
  original = "original",
  jpeg = "jpeg",
}

export enum Status {
  notAnalyzed = 0b001,
  analyzed = 0b010,
  failed = 0b100,
}

/**
 * enum
 * all - 000
 * notAnalyzed - 001
 * analyzed - 010
 * failed - 100
 * notAnalyzed + analyzed - 011
 * notAnalyzed + failed - 101
 * analyzed + failed - 110
 * notAnalyzed + analyzed + failed - 111
 */

export enum FilterType {
  Status = "상태",
  Crop = "품종",
  Date = "촬영 일시",
}

export enum CropType {
  Pepper = "고추",
  Tomato = "토마토",
  Cucumber = "오이",
  Onion = "양파",
  Watermelon = "수박",
}

export enum ReAnalyzeStatus {
  ReAnalysis = "Reanalysis",
  newAnalyzeCall = "새버전 분석",
  reAnalyzeCall = "재분석 요청",
}

export enum ButtonType {
  none = "none",
  image = "image",
  excel = "excel",
  reanalysis = "reanalysis",
}

export enum FileName {
  rgb = "rgb",
  nir1 = "nir1",
  nir2 = "nir2",
}

export enum ImageName {
  RGB = "RGB",
  NIR1 = "NIR1",
  NIR2 = "NIR2",
}
