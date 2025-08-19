import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  IconRowRemove,
} from "@tabler/icons-react";
import type { SubServiceModel } from "../models/sub-service-model";
import { EditSubServiceDrawer } from "./edit-subservice-drawer";

interface SubServiceCardProps {
  onSubServiceUpdated?: () => Promise<void>;
  onDeleteRequest?: (item: SubServiceModel) => void;
  subService: SubServiceModel;
}

export function SubServiceCard({
  onSubServiceUpdated,
  onDeleteRequest,
  subService,
}: SubServiceCardProps) {
  return (
    <Card className="w-full mb-3">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-sm mb-2">
                {subService.mainService?.vehicle?.plate}{" "}
                {subService.mainService?.vehicle?.brand}{" "}
                {subService.mainService?.vehicle?.model}
                Servis Ayrıntıları
              </h3>
              <Label>İşlem</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {subService.operation}
              </p>
              <Label>Personel</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {subService.employee?.name} {subService.employee?.surname}
              </p>
              <Label>İşlem Tarihi</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {subService.operationDate instanceof Date
                  ? subService.operationDate.toLocaleDateString()
                  : subService.operationDate}
              </p>
              <Label>Açıklama</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {subService.description}
              </p>
              <Label>Tedarikçi</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {subService.supplier?.name}
              </p>
              <Label>Malzeme</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {subService.material}
              </p>
              <Label>Malzeme Markası</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {subService.materialBrand}
              </p>
              <Label>Malzeme Maliyeti</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {subService.materialCost}
              </p>
              <Label>İndirim</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {subService.discount}
              </p>
              <Label>Maliyet</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {subService.cost}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 float-right">
            {subService.mainService?.mainServiceStatus === 0 && (
              <>
                <EditSubServiceDrawer
                  state={subService}
                  onSubServiceUpdated={onSubServiceUpdated}
                ></EditSubServiceDrawer>
                <IconRowRemove
                  onClick={() => onDeleteRequest?.(subService)}
                ></IconRowRemove>
              </>
            )}
            <></>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
