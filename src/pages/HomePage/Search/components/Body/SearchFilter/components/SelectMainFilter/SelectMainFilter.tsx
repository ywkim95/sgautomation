import styles from "../../SearchFilter.module.scss";
import { FilterType } from "../../../../../../../../common/constants/Enum.ts";
import {EnumToKeyValueObjectArray} from "../../../../../../../../common/constants/Utils.ts";

interface SelectMainFilterProps {
  selectedFilter: string;
  setSelectedFilter: (newSelectedFilter: string) => void;
}

const SelectMainFilter = ({
  selectedFilter,
  setSelectedFilter,
}: SelectMainFilterProps) => {
  
  const filters = EnumToKeyValueObjectArray(FilterType);

  // 메뉴 선택(상태, 품종, 촬영일시)
  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter === selectedFilter ? "" : filter);
  };

  return (
    <div className={styles.search__mainFilter}>
      {filters.map((filter) => {
        const className = `${selectedFilter === filter.name ? styles.selected : ""}`;
        return (
          <div
            key={filter.key}
            onClick={() => handleFilterClick(filter.name)}
            className={className}
          >
            {filter.name}
          </div>
        )
      })}
    </div>
  );
};

export default SelectMainFilter;
