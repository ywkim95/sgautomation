import {ChangeEvent, useCallback, useState} from "react";

const useInputHook = (initialValue: string, onFocusAction?: () => void) => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  },[]);

  const onFocus = useCallback(() => {
    if (onFocusAction) {
      onFocusAction();
    }
  },[onFocusAction]);

  return {
    value,
    onChange,
    onFocus,
  };
};

export default useInputHook;
