export interface ResponseDetail {
  captureId: number;
  measurementReal: number;
  measurementAnalysis?: number | null;
  leafAreaReal: number;
  leafAreaAnalysis?: number | null;
  leafColorReal: string;
  leafColorAnalysis?: string | null;
  uniformityReal: number;
  uniformityAnalysis?: number | null;
  status: number;
  errorCode?: string | null;
}
