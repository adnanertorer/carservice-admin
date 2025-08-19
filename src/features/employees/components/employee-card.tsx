import { Card, CardContent } from "@/components/ui/card";
import { IconRowRemove } from "@tabler/icons-react";
import type { EmployeeModel } from "../models/employee-model";
import { EditEmployeeDrawer } from "./edit-employee-drawer";
import { Label } from "@/components/ui/label";

interface EmployeeCardProps {
  employee: EmployeeModel;
  onEmployeeUpdated?: () => Promise<void>;
  onDeleteRequest?: (item: EmployeeModel) => void;
}

export function EmployeeCard({
  employee,
  onEmployeeUpdated,
  onDeleteRequest,
}: EmployeeCardProps) {
  return (
    <Card className="w-full mb-3">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-sm mb-2">
                {employee.name} {employee.surname}
              </h3>
              <Label>E-Posta</Label>
              <p className="text-xs text-muted-foreground mb-2">{employee.email}</p>
              <Label>Telefon</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {employee.phoneNumber}
              </p>
              <Label>Adres</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {employee.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 float-right">
            <EditEmployeeDrawer
              employee={employee}
              onEmployeeUpdated={onEmployeeUpdated}
            />
            <IconRowRemove
              className="cursor-pointer"
              onClick={() => onDeleteRequest?.(employee)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
