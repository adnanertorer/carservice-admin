
import api from "../api/axios";
import type { MainResponse, PaginatedResponse } from "../api/responses/PaginatedResponse";
import type { IGenericModel } from "./IGenericModel";
import type { IGenericService } from "./IGenericService";

export class GenericService<TModel> implements IGenericService<TModel> {
  private basePath: string;
  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async getList(): Promise<MainResponse<TModel>> {
    const response = await api.get(this.basePath);
    console.log(response.data);
    return response.data;
  }

  async customPostByPagination(model: IGenericModel, url: string): Promise<PaginatedResponse<TModel>> {
    const response = await api.post(this.basePath + url, model);
    return response.data.data;
  }

  async getByFilter(
    parentId: string | undefined,
    parentParameterName: string | undefined,
    page: number,
    pageSize: number,
    search: string,
    isAll: boolean,
  ): Promise<MainResponse<TModel>> {
    const query = new URLSearchParams();
    query.append("pageIndex", page.toString());
    query.append("pageSize", pageSize.toString());
    query.append("search", search);
    query.append("IsAllItems", isAll ? "true" : "false");
    if (parentParameterName) {
      query.append(parentParameterName, parentId!);
    }
    const response = await api.get<MainResponse<TModel>>(
      `${this.basePath}/list?${query.toString()}`
    );
    return response.data;
  }

  remove(id: string): Promise<void> {
    return api.delete(`${this.basePath}/${id}`);
  }

  async update(model: TModel): Promise<void> {
    return await api.put(`${this.basePath}`, model);
  }

  async getById(id: string): Promise<TModel> {
    const response = await api.get(`${this.basePath}/${id}`);
    return response.data;
  }

  async save(model: TModel): Promise<void> {
    return await api.post(`${this.basePath}`, model);
  }
}
