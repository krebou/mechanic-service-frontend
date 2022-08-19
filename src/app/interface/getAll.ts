export interface GetAllResponse<T>{
  count:number;
  page: number;
  per_page: 25;
  sort: "ASC" | "DESC";
  isNextPage: boolean;
  data: T[]
}
