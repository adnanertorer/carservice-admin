import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { NavigateFunction } from "react-router-dom";
import type { MainServiceModel } from "../models/main-service-model";
import { IconListDetails, IconRowRemove, IconSettingsPlus } from "@tabler/icons-react";
import { EditMainServiceDrawer } from "./edit-mainservice-drawer";

interface MainServiceCardProps {
  navigate?: NavigateFunction;
  onMainServiceUpdated?: () => Promise<void>;
  onDeleteRequest?: (item: MainServiceModel) => void;
  mainService: MainServiceModel;
}

export function MainServiceCard({
  navigate,
  onMainServiceUpdated,
  onDeleteRequest,
  mainService,
}: MainServiceCardProps) {
  return (
    <Card className="w-full mb-3">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-sm mb-2">
                {mainService.description}
              </h3>
              <Label>Plaka</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {mainService.vehicle?.plate}
              </p>
              <Label>Marka</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {mainService.vehicle?.brand}
              </p>
              <Label>Model</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {mainService.vehicle?.model}
              </p>
              <Label>Araç Kilometre</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {mainService.kilometer}
              </p>
              <Label>Maliyet</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {mainService.cost}
              </p>
              <Label>Durum</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {mainService.mainServiceStatus == 0
                  ? "Açık"
                  : mainService.mainServiceStatus == 1
                  ? "Hazırlanıyor"
                  : mainService.mainServiceStatus == 2
                  ? "Tamamlandı"
                  : mainService.mainServiceStatus == 3
                  ? "İptal Edildi"
                  : null}
              </p>
              <Label>Servis Tarihi</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {mainService.serviceDate instanceof Date
                  ? mainService.serviceDate.toLocaleDateString()
                  : mainService.serviceDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 float-right">
            {mainService.mainServiceStatus === 0 && (
            <>
              <IconSettingsPlus
                onClick={() => {
                  if (navigate) {
                    navigate(`/main-services/${mainService.id}/sub-services`);
                  }
                }}
              ></IconSettingsPlus>
              <IconRowRemove
                onClick={() => onDeleteRequest?.(mainService)}
              ></IconRowRemove>
              <EditMainServiceDrawer
                mainService={mainService}
                onMainServiceUpdated={onMainServiceUpdated}
              ></EditMainServiceDrawer>
            </>
          )}
          {mainService.mainServiceStatus !== 0 && (
            <IconListDetails
              onClick={() => {
                if (navigate) {
                  navigate(`/main-services/${mainService.id}/sub-services`);
                }
              }}
            ></IconListDetails>
          )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
