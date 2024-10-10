import { useState } from "react";
import {
  ButtonType,
  ReAnalyzeStatus,
} from "../../../../../../../../common/constants/Enum.ts";
import useSearchHandlerStore from "../../../../../store/useSearchHandlerStore.ts";
import useDownloadListHook from "../../../hooks/useDownloadListHook.tsx";

const useReAnalysisActiveButtonHook = () => {
  const [selectedText, setSelectedText] = useState<ReAnalyzeStatus>(
    ReAnalyzeStatus.ReAnalysis,
  );
  const [isShow, setIsShow] = useState(false);
  const { onClickReanalysis } = useDownloadListHook();
  const { setProps, reset, name } = useSearchHandlerStore();
  const options: ReAnalyzeStatus[] = [
    ReAnalyzeStatus.newAnalyzeCall,
    ReAnalyzeStatus.reAnalyzeCall,
  ];

  const onClickAnalysisBtn = () => {
    setIsShow(!isShow);
  };

  const onClickOption = (option: ReAnalyzeStatus) => {
    // 체크박스 및 다운로드 버튼 표기
    setProps({
      show: true,
      name: option,
      onClick: onClickReanalysis,
      type: ButtonType.reanalysis,
    });

    setIsShow(false);
    setSelectedText(option);
  };

  const onClickReset = () => {
    if (name === ReAnalyzeStatus.ReAnalysis) return;

    // 체크박스 및 다운로드 버튼 숨김
    reset();

    setSelectedText(ReAnalyzeStatus.ReAnalysis);
  };

  const onClickBtn = () => {
    if (selectedText === ReAnalyzeStatus.ReAnalysis) {
      onClickAnalysisBtn();
    } else {
      onClickReset();
    }
  };

  return {
    selectedText,
    isShow,
    options,
    onClickBtn,
    onClickOption,
  };
};

export default useReAnalysisActiveButtonHook;
