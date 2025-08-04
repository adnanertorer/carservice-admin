import type { CreateCompanyUserModel } from "../models/create-company-user-model";

export interface ICreateCompanyFormProps {
    onSubmit: (model: CreateCompanyUserModel) => void; 
}