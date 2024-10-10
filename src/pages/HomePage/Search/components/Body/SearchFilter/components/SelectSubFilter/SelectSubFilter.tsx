import { FilterType } from "../../../../../../../../common/constants/Enum.ts";
import styles from "../../SearchFilter.module.scss";

interface SelectSubFilterProps {
  subFiltersContent: {
    [FilterType.Status]: string[];
    [FilterType.Crop]: string[];
  };
  selectedFilter: FilterType;
  selectedSubFilters: { [key: string]: string[] };
  handleSubFilterClick: (subFilter: string) => void;
}

const SelectSubFilter = ({
  subFiltersContent,
  selectedFilter,
  selectedSubFilters,
  handleSubFilterClick,
}: SelectSubFilterProps) => {
  return (
    <>
      {selectedFilter !== FilterType.Date &&
        subFiltersContent[selectedFilter]?.map((subFilter: string) => {
          const className = `${selectedSubFilters[selectedFilter]?.includes(subFilter) ? styles.selectedSub : ""}`;
          return (
            <div
              key={subFilter}
              className={className}
              onClick={() => handleSubFilterClick(subFilter)}
            >
              {subFilter}
            </div>
          )
        })}
    </>
  );
};

export default SelectSubFilter;
