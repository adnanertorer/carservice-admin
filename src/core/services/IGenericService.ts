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

    remove: (id: string) =>  Promise<MainResponse<T>>;
    update: (model: T) => Promise<MainResponse<T>>;
    getById: (id: string) =>  Promise<MainResponse<T>>;
    save: (model: T) =>  Promise<MainResponse<T>>;
    customPostByPagination: (model: IGenericModel, url: string) => Promise<PaginatedResponse<T>>;
}