import type { MainResponse, PaginatedResponse } from "../api/responses/PaginatedResponse";
import type { IGenericModel } from "./IGenericModel";


export interface IGenericService<T>{
    getByFilter:(
        parentId: string | undefined,
        parentParameterName: string | undefined,
        page: number,
        pageSize: number,
        search: string | "",
        isAll: boolean
    ) => Promise<MainResponse<T>>;
    getList: () => Promise<MainResponse<T>>;

    remove: (id: string) => Promise<void>;
    update: (model: T) => Promise<void>;
    getById: (id: string) => Promise<T>;
    save: (model: T) => Promise<void>;
    customPostByPagination: (model: IGenericModel, url: string) => Promise<PaginatedResponse<T>>;
}