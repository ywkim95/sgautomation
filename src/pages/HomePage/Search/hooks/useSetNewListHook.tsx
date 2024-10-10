import { useListStore } from "../store/useListStore.ts";
import { Result } from "../models/Result.model.ts";
import { useCallback } from "react";

const useSetNewListHook = () => {
  const { list, setList } = useListStore((state) => state);
  const setNewList = useCallback(
    (data: Result) => {
      const newList = [...list].map((item) => {
        if (item.captureID === data.captureID) {
          return data;
        } else {
          return item;
        }
      });
      setList(newList);
    },
    [list, setList],
  );

  const updateAllChecked = (value: boolean) => {
    const newList = [...list].map((item) => {
      item.selected = value;
      return item;
    });
    setList(newList);
  };

  const updateList = useCallback((data: Result[]) => {
    const newList = [...list].map((item) => {
      const newItem = data.find((newItem) => newItem.captureID === item.captureID);
      if (newItem) {
        return newItem;
      }
      return item;
    });
    setList(newList);
  }, []);

  const resetDetailHandler = () => {
    const newList = [...list].map((item) => {
      return {
        ...item,
        clickedDetail: false,
      };
    });
    setList(newList);
  };

  const setDetailHandler = (id: number) => {
    const newList = [...list].map((item) => {
      if (item.captureID === id) {
        return {
          ...item,
          clickedDetail: true,
        };
      }
      return {
        ...item,
        clickedDetail: false,
      };
    });
    setList(newList);
  };

  return {
    setNewList,
    updateAllChecked,
    updateList,
    setDetailHandler,
    resetDetailHandler,
  };
};

export default useSetNewListHook;
