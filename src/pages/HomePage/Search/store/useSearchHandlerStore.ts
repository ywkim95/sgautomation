// show: boolean, name: string, onClick: () => void

import { create, StateCreator } from "zustand";
import { Nothing } from "../../../../common/constants/Utils.ts";
import { ButtonType } from "../../../../common/constants/Enum.ts";

interface State {
  show: boolean;
  name: string;
  onClick: () => void;
  type: ButtonType;
}
interface Action {
  setOnClick: (onClick: () => void) => void;
  setName: (name: string) => void;
  setShow: (show: boolean) => void;
  setType: (type: ButtonType) => void;
  setProps: (props: State) => void;
  reset: () => void;
}

interface SearchHandlerStoreProps extends State, Action {}

const useSearchHandlerCreator: StateCreator<SearchHandlerStoreProps> = (
  set,
) => ({
  show: false,
  name: "",
  onClick: Nothing,
  type: ButtonType.none,
  setOnClick: (onClick) => set({ onClick }),
  setName: (name) => set({ name }),
  setShow: (show) => set({ show }),
  setType: (type) => set({ type }),
  setProps: (props) => set({ ...props }),
  reset: () =>
    set({ show: false, name: "", onClick: Nothing, type: ButtonType.none }),
});
/**
 * 재분석, 다운로드 관련 버튼 클릭시 동작하는 함수 및 상태를 저장하기 위한 store
 * - show: boolean
 * - name: string
 * - type: ButtonType(none, image, excel, reanalysis)
 * - onClick: () => void
 * - setOnClick: (onClick: () => void) => void
 * - setName: (name: string) => void
 * - setShow: (show: boolean) => void
 * - setType: (type: ButtonType) => void
 */
const useSearchHandlerStore = create(useSearchHandlerCreator);

export default useSearchHandlerStore;
