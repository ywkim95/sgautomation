import styles from "../../SearchFilter.module.scss";
import {ChangeEvent, FC} from "react";

interface DateInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: FC<DateInputProps> = ({value, onChange}) => {
  return (
    <div className={styles.search__searchWrap}>
      <input
        type="date"
        value={value}
        onChange={onChange}
        className={styles.search__searchDate}
      />
      <div className={styles.search__searchIconBox}></div>
    </div>
  );
};

export default DateInput;
