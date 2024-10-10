import { useEffect, useRef, useState } from "react";
import {
  CropType,
  FilterType,
  Status,
} from "../../../../../../../common/constants/Enum.ts";
import { usePaginationStore } from "../../../../store/usePaginationStore.ts";

const useSearchFilterHook = () => {
  const { resetBody, setPaginationBody, paginationBody } = usePaginationStore();
  // ref
  const filterRef = useRef<HTMLDivElement>(null);

  // 하위메뉴
  const subFiltersContent: {
    [FilterType.Status]: string[];
    [FilterType.Crop]: string[];
    [FilterType.Date]: string | null;
  } = {
    [FilterType.Status]: Object.values(Status).filter((value) => typeof value === "number").map((status) => {
      switch(status) {
        case Status.notAnalyzed:
          return "미분석";
        case Status.analyzed:
          return "분석완료";
        case Status.failed:
          return "분석실패";
        default:
          return "";
      }
    }),
    [FilterType.Crop]: Object.values(CropType),
    [FilterType.Date]: null,
  };

  // 선택된 메뉴 (상태, 품종, 촬영일시)
  const [selectedFilter, setSelectedFilter] = useState("");

  // 선택된 하위메뉴
  const [selectedSubFilters, setSelectedSubFilters] = useState<{
    [key: string]: string[];
  }>({});

  // 선택된 필터들
  const [filterResults, setFilterResults] = useState<string[]>([]);

  // 필터 초기화
  const resetFilters = () => {
    setSelectedFilter("");
    setFilterResults([]);
    setSelectedSubFilters({});
    resetBody();
  };

  // Status 값에 따른 filterValue 반환
  const getSubFilterValue = (selectedSubFilters: string[]) => {
    let filterValue = 0b000;
    if (!selectedSubFilters) return filterValue;
    selectedSubFilters.forEach((selectedSubFilter) => {
      switch (selectedSubFilter) {
        case '미분석':
          filterValue |= 0b001;
          break;
        case '분석완료':
          filterValue |= 0b010;
          break;
        case '분석실패':
          filterValue |= 0b100;
          break;
      }
    });
    return filterValue;
  };

  // 하위메뉴 선택
  const handleSubFilterClick = (subFilter: string) => {
    const newSelectedSubFilters = (prev: { [p: string]: string[] }) => {
      const prevSubFilters = prev[selectedFilter] || [];
      const isAlreadySelected = prevSubFilters.includes(subFilter);

      let newSubFilters;
      let newFilterResults = [...filterResults];

      if (isAlreadySelected) {
        newSubFilters = prevSubFilters.filter((s) => s !== subFilter);
        newFilterResults = newFilterResults.filter(
          (result) => result !== subFilter,
        );
      } else {
        newSubFilters = [...prevSubFilters, subFilter];
        if (!newFilterResults.includes(subFilter)) {
          newFilterResults.push(subFilter);
        }
      }

      setFilterResults(newFilterResults);
      return { ...prev, [selectedFilter]: newSubFilters };
    };

    setSelectedSubFilters(newSelectedSubFilters);
  };
  
  useEffect(() => {
    if (
      selectedSubFilters[FilterType.Status] ||
      selectedSubFilters[FilterType.Crop]
    ) {
      const status = getSubFilterValue(selectedSubFilters[FilterType.Status]);
      const crop = selectedSubFilters[FilterType.Crop];
      setPaginationBody({
        ...paginationBody,
        filter: {
          ...paginationBody.filter,
          status,
          crop,
        },
      });
    }
  }, [selectedSubFilters]);

  // filter-height를 변경하기위한 로직
  useEffect(() => {
    const filterElement = filterRef.current;
    if (filterElement) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          const height = target.offsetHeight;
          document.documentElement.style.setProperty(
            "--filter-height",
            `${height}px`,
          );
        }
      });

      resizeObserver.observe(filterElement);

      return () => resizeObserver.unobserve(filterElement);
    }
  }, []);

  return {
    filterRef,
    subFiltersContent,
    selectedFilter,
    setSelectedFilter,
    selectedSubFilters,
    setSelectedSubFilters,
    filterResults,
    setFilterResults,
    resetFilters,
    handleSubFilterClick,
  };
};

export default useSearchFilterHook;
