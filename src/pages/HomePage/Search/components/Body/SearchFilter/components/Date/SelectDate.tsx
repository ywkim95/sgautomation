import styles from "../../SearchFilter.module.scss";
import useSelectDateHook from "./hooks/useSelectDateHook.tsx";
import DateInput from "./DateInput.tsx";
// filterResults={filterResults} setFilterResults={setFilterResults}
const SelectDate = ({
  filterResults,
  setFilterResults,
}: {
  filterResults: string[];
  setFilterResults: (newFilterResults: string[]) => void;
}) => {
  const { dates, handleDateChange, handleSubmit } = useSelectDateHook({
    filterResults,
    setFilterResults,
  });
  
  return (
    <div className={styles.search__search}>
      <DateInput value={dates.start} onChange={handleDateChange('start')} />
      <span> ~ </span>
      <DateInput value={dates.end} onChange={handleDateChange('end')} />
      <button onClick={handleSubmit} className={styles.search__button}>
        Submit
      </button>
    </div>
  );
};

export default SelectDate;
