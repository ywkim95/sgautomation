interface PaginationModel {
  startIndex: number;
  count: number;
  filter: {
    status: number;
    crop?: string[];
    startDate?: string;
    endDate?: string;
  };
}

export default PaginationModel;
