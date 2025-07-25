export interface ISingleResponse<T>{
  data?: T;
  errors?: string[];
  message?: string;
  statusCode: number;
  succeeded: boolean;
}