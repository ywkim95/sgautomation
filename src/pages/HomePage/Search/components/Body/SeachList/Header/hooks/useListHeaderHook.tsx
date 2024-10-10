import { ChangeEvent, useEffect, useState } from "react";
import { useListStore } from "../../../../../store/useListStore.ts";
import useSetNewListHook from "../../../../../hooks/useSetNewListHook.tsx";

const useListHeaderHook = () => {
  const { list } = useListStore((state) => state);
  const [allChecked, setAllChecked] = useState(false);
  const { updateAllChecked } = useSetNewListHook();
  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAllChecked(e.target.checked);
    updateAllChecked(e.target.checked);
  };

  useEffect(() => {
    if (list.length === 0) return;
    const isAllChecked = list.every((item) => item.selected);

    setAllChecked(isAllChecked);
  }, [list]);

  return {
    allChecked,
    checkHandler,
  };
};

export default useListHeaderHook;
