import { Card, CardContent } from "@/components/ui/card";
import { IconRowRemove } from "@tabler/icons-react";
import type { SupplierModel } from "../models/supplier-model";
import { EditSupplierDrawer } from "./edit-drawer";
import { Label } from "@/components/ui/label";

interface SupplierCardProps {
  supplier: SupplierModel;
  onSupplierUpdated?: () => Promise<void>;
  onDeleteRequest?: (item: SupplierModel) => void;
}

export function SupplierCard({
  supplier,
  onSupplierUpdated,
  onDeleteRequest,
}: SupplierCardProps) {
  return (
    <Card className="w-full mb-3">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-sm mb-2">{supplier.name}</h3>
              <Label>E-Posta</Label>
              <p className="text-xs text-muted-foreground mb-2">{supplier.email}</p>
              <Label>İletişim Adı</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {supplier.contactName}
              </p>
              <Label>Vergi Dairesi</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {supplier.taxOffice}
              </p>
              <Label>Vergi Numarası</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {supplier.taxNumber}
              </p>
              <Label>Adres</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {supplier.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 float-right">
            <EditSupplierDrawer
              supplier={supplier}
              onSupplierUpdated={onSupplierUpdated}
            />
            <IconRowRemove
              className="cursor-pointer"
              onClick={() => onDeleteRequest?.(supplier)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
