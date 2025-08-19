import { Card, CardContent } from "@/components/ui/card";
import type { CustomerModel } from "../models/CustomerModel";
import type { NavigateFunction } from "react-router-dom";
import { EditCustomerDrawer } from "./edit-drawer";
import { IconCar, IconReportMoney, IconRowRemove } from "@tabler/icons-react";

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
              <h3 className="font-semibold text-sm">
                {customer.name} {customer.surname}
              </h3>
              <p className="text-xs text-muted-foreground">{customer.email}</p>
              <p className="text-xs text-muted-foreground">{customer.phone}</p>
              <p className="text-xs text-muted-foreground">
                {customer.city?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {customer.district?.name}
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
