import { Card, CardContent } from "@/components/ui/card";
import type { CustomerModel } from "../models/CustomerModel";
import type { NavigateFunction } from "react-router-dom";
import { EditCustomerDrawer } from "./edit-drawer";
import { IconCar, IconReportMoney, IconRowRemove } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";

interface CustomerCardProps {
  customer: CustomerModel;
  onCustomerUpdated?: () => Promise<void>;
  navigate?: NavigateFunction;
  onDeleteRequest?: (item: CustomerModel) => void;
}

export function CustomerCard({
  customer,
  onCustomerUpdated,
  navigate,
  onDeleteRequest,
}: CustomerCardProps) {
  return (
    <Card className="w-full mb-3">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-sm mb-2">
                {customer.name} {customer.surname}
              </h3>
              <Label>E-Posta</Label>
              <p className="text-xs text-muted-foreground mb-2">{customer.email}</p>
              <Label>Telefon</Label>
              <p className="text-xs text-muted-foreground mb-2">{customer.phone}</p>
              <Label>Şehir</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {customer.city?.name}
              </p>
              <Label>İlçe</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {customer.district?.name}
              </p>
               <Label>Adres</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {customer.address}
              </p>
            </div>
          </div>

            <div className="flex items-center gap-6 float-right">
              <EditCustomerDrawer
                customer={customer}
                onCustomerUpdated={onCustomerUpdated}
              ></EditCustomerDrawer>
              <IconRowRemove
                onClick={() => onDeleteRequest?.(customer)}
              ></IconRowRemove>
              <IconCar
                onClick={() => {
                  if (navigate) {
                    navigate(`/customers/${customer.id}/vehicles`);
                  }
                }}
              ></IconCar>
              <IconReportMoney
                onClick={() => {
                  if (navigate) {
                    navigate(`/customer-transactions/${customer.id}`);
                  }
                }}
              ></IconReportMoney>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
