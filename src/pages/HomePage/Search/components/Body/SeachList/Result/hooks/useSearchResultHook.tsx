import { ChangeEvent, useCallback } from "react";
import { Result } from "../../../../../models/Result.model.ts";
import useZIndexStore from "../../../../../../../../common/stores/useZIndexStore.ts";
import useDetailStore from "../../../../../../Detail/store/useDetailStore.ts";
import { useDetailHook } from "../../../../../../Detail/hooks/useDetailHook.tsx";
import useDetailAnalysisHook from "../../../../../../Detail/hooks/useDetailAnalysisHook.tsx";
import useSetNewListHook from "../../../../../hooks/useSetNewListHook.tsx";
import { Status } from "../../../../../../../../common/constants/Enum.ts";

const useSearchResultHook = (data: Result) => {
  const { setIndexZero } = useZIndexStore();
  const { setResult } = useDetailStore();
  const { getDetail } = useDetailHook();
  const { getAnalyzeDetail } = useDetailAnalysisHook();
  const { setNewList, setDetailHandler, resetDetailHandler } =
    useSetNewListHook();
  const checkHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      data.selected = e.target.checked;
      setNewList(data);
    },
    [data, setNewList],
  );

  const onClickDetail = useCallback(async () => {
    if (data.clickedDetail) return;

    resetDetailHandler();

    setDetailHandler(data.captureID);

    console.log(data.analyzeStatus);
    setResult(data);
    if (data.analyzeStatus === Status.analyzed) {
      await getDetail(data.captureID);
    } else {
      await getAnalyzeDetail(data.captureID);
    }
    setIndexZero(true);
  }, [data, getDetail, getAnalyzeDetail]);

  return {
    checkHandler,
    onClickDetail,
  };
};

export default useSearchResultHook;
