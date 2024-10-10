import { usePaginationStore } from "../../../../../../store/usePaginationStore.ts";
import { ChangeEvent, useState } from "react";

const useSelectDateHook = ({
  filterResults,
  setFilterResults,
}: {
  filterResults: string[];
  setFilterResults: (newFilterResults: string[]) => void;
}) => {
  const { setPaginationBody, paginationBody } = usePaginationStore();
  // date
  const [dates, setDates] = useState({ start: "", end: "" });

  // dateFilterIndex
  const [dateFilterIndex, setDateFilterIndex] = useState<number | null>(null);

  // 날짜 변경
  const handleDateChange =
    (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
      if (field === "start" && dates.end) {
        if (event.target.value > dates.end) {
          alert("시작일이 종료일보다 늦을 수 없습니다.");
          setDates((prevState) => ({ ...prevState, start: "" }));
          return;
        }
      }
      if (field === "end" && dates.start) {
        if (event.target.value < dates.start) {
          alert("종료일이 시작일보다 빠를 수 없습니다.");
          setDates((prevState) => ({ ...prevState, end: "" }));
          return;
        }
      }

      setDates((prevDates) => ({ ...prevDates, [field]: event.target.value }));
    };

  // 날짜 확정
  const handleSubmit = () => {
    if (!dates.start || !dates.end) return;

    if (dates.start > dates.end) {
      alert("시작일이 종료일보다 늦을 수 없습니다.");
      setDates((prevState) => ({ ...prevState, start: "", end: "" }));
      return;
    }

    if (dates.end > new Date().toISOString().split("T")[0]) {
      alert("종료일이 오늘보다 늦을 수 없습니다.");
      setDates((prevState) => ({ ...prevState, start: "", end: "" }));
      return;
    }

    if (dates.start && dates.end) {
      const formattedDate = `${dates.start} ~ ${dates.end}`;
      if (dateFilterIndex !== null && filterResults[dateFilterIndex]) {
        const updatedResults = [...filterResults];
        updatedResults[dateFilterIndex] = formattedDate;
        setFilterResults(updatedResults);
      } else {
        setDateFilterIndex(filterResults.length);
        setFilterResults([...filterResults, formattedDate]);
      }

      setPaginationBody({
        ...paginationBody,
        filter: {
          ...paginationBody.filter,
          endDate: dates.end,
          startDate: dates.start,
        },
      });

      setDates({ start: "", end: "" });
    }
  };

  return {
    dates,
    handleDateChange,
    handleSubmit,
  };
};

export default useSelectDateHook;
