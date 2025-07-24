import type { CityModel } from "@/shared/models/city-model";
import type { DistrictModel } from "@/shared/models/district-model";

export type SupplierModel = {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  address: string;
  cityId: number;
  districtId: number;
  taxOffice?: string;
  taxNumber?: string;
  city?: CityModel
  district?: DistrictModel;
};