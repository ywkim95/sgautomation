import { ChangeEvent, HTMLInputTypeAttribute } from "react";
type LoginTextFieldProps = {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  placeholder: string;
  className: string;
};

const LoginTextField = ({
  id,
  name,
  type,
  value,
  onChange,
  onFocus,
  placeholder,
  className,
}: LoginTextFieldProps) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{name}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LoginTextField;
