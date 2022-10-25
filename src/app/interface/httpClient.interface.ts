export interface GetAllResponse<T> {
    count: number;
    page: number;
    per_page: number;
    sort: 'ASC' | 'DESC';
    isNextPage: boolean;
    data: T[];
}

export interface GetAllRequest<T> {
    page: number;
    per_page: number;
    sort: 'ASC' | 'DESC';
    orderby: string;
    where?: GetAllRequestWhere<T>;
}

export type GetAllRequestWhere<T> = {
    [Property in keyof T]?:
        | T[Property]
        | {
              $find?: T[Property];
              $gt?: T[Property];
              $gte?: T[Property];
              $lt?: T[Property];
              $lte?: T[Property];
          };
};
