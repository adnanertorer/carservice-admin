export interface PaginatedResponse<T> {
    items: T[];
    pages: number;
    count: number;
    size: number;
    index: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }

export interface MainResponse<T>{
  data?: PaginatedResponse<T>;
  errors?: string[];
  message?: string;
  statusCode: number;
  succeeded: boolean;
}
  