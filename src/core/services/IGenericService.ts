import type { ISingleResponse } from "../api/responses/ISingleResponse";
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

    remove: (id: string) =>  Promise<ISingleResponse<T>>;
    update: (model: T) => Promise<ISingleResponse<T>>;
    getById: (id: string) =>  Promise<ISingleResponse<T>>;
    save: (model: T) =>  Promise<ISingleResponse<T>>;
    customPostByPagination: (model: IGenericModel, url: string) => Promise<PaginatedResponse<T>>;
}