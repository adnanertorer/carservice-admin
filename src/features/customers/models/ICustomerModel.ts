export type ICustomerModel = {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    address: string; 
    taxOffice: string;
    taxNumber: string;
    isActive: boolean;
    cityId: number;
    districtId: number;
}