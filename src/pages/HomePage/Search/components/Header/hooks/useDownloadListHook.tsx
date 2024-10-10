import { Status } from "../../../../../../common/constants/Enum.ts";
import useDownloadListApiHook from "./useDownloadListApiHook.tsx";
import useReAnalysisApiHook from "./useReAnalysisApiHook.tsx";
import { useListStore } from "../../../store/useListStore.ts";
import HandleDownloadImagesAsZip from "../functions/HandleDownloadImagesAsZip.ts";
import HandleDownloadExcelsAsZip from "../functions/HandleDownloadExcelsAsZip.ts";
import { ImageWithId } from "../../../../Detail/models/image.model.ts";
import { ResponseDetail } from "../../../../Detail/models/ResponseDetail.model.ts";

const useDownloadListHook = () => {
  const { list } = useListStore();
  const { downloadList } = useDownloadListApiHook();
  const { reAnalysisList } = useReAnalysisApiHook();

  const isCheckedAll = () => {
    if (list.every((item) => !item.selected)) {
      alert("다운로드할 항목을 선택해 주세요!");
      return;
    }
  };

  const onClickReanalysis = async () => {
    if (list.every((item) => item.analyzeStatus === Status.analyzed)) {
      alert("분석할 항목이 없습니다!");
      return;
    }
    await reAnalysisList();
  };

  const onClickImageDownload = async () => {
    isCheckedAll();

    const model = (await downloadList("image")) as {
      data: ImageWithId[];
      idList: number[];
    };

    if (!model) return;

    await HandleDownloadImagesAsZip(model, list);
  };

  const onClickExcelDownload = async () => {
    isCheckedAll();
    const model = (await downloadList("excel")) as {
      data: ResponseDetail[];
      idList: number[];
    };

    if (!model) return;

    await HandleDownloadExcelsAsZip(model, list);
  };

  return {
    onClickReanalysis,
    onClickImageDownload,
    onClickExcelDownload,
  };
};

export default useDownloadListHook;
