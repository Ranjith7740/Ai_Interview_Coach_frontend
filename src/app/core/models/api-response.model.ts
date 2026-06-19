export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface PagedData<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
