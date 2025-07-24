import type { CityModel } from "./CityModel";
import type { DistrictModel } from "./DistrictModel";

export type CustomerModel = {
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
    city?: CityModel;
    district?: DistrictModel;
}