import type { CreateCompanyModel } from "./create-company-model";
import type { CreateUserModel } from "./create-user-model"

export type CreateCompanyUserModel = {
    user: CreateUserModel;
    company: CreateCompanyModel;
}