
export interface IPaginationRequest {
  page?: number;
  limit?: number;
}


export interface IPagination<T> {
  data: T[]
  total: number
}
