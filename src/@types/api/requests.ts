export type Paginated<T> = {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
};

export type PaginateQuery = {
  page: number;
  limit: number;
};
