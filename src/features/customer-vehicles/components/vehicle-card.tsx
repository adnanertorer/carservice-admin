import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IconRowRemove } from "@tabler/icons-react";
import type { CustomerVehicleModel } from "../models/customer-vehicle-model";
import { getFuelType } from "@/core/enums/carServiceEnum";
import { EditCustomerVehicleDrawer } from "./edit-vehicle-drawer";
import { CreateMainServiceDrawer } from "@/features/main-services/components/create-mainservice-drawer";
import { toast } from "react-toastify";
import type { NavigateFunction } from "react-router-dom";

interface VehicleCardProps {
  onVehicleUpdated?: () => Promise<void>;
  onDeleteRequest?: (item: CustomerVehicleModel) => void;
  vehicle: CustomerVehicleModel;
  navigate?: NavigateFunction;
}

export function CustomerVehicleCard({
  onVehicleUpdated,
  onDeleteRequest,
  vehicle,
  navigate,
}: VehicleCardProps) {
  return (
    <Card className="w-full mb-3">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-sm mb-2">
                {vehicle.plate} {vehicle.brand} {vehicle.model}
              </h3>
              <Label>Yıl</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {vehicle.year}
              </p>
              <Label>Motor</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {vehicle.engine}
              </p>
              <Label>Yakıt Tipi</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {getFuelType(vehicle.fuelTypeId)}
              </p>
              <Label>Şasi No</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {vehicle.serialNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 float-right">
            <EditCustomerVehicleDrawer
              vehicle={vehicle}
              onVehicleUpdated={onVehicleUpdated}
            />
            <IconRowRemove
              className="cursor-pointer"
              onClick={() => onDeleteRequest?.(vehicle)}
            />
            <CreateMainServiceDrawer
              vehicleId={vehicle.id}
              onMainServiceCreated={async () => {
                toast.success("Ana servis başarıyla oluşturuldu.");
                if (navigate) {
                  navigate(`/main-services`);
                }
              }}
            />
            <></>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
