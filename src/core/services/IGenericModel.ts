import type { IPaginationParams } from "../models/PaginationParams";

export interface IGenericModel {
    name?: string;
    pageRequest?: IPaginationParams;
}