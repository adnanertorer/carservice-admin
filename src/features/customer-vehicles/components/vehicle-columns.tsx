import type { GenericService } from "@/core/services/GenericService";
import type { CustomerVehicleModel } from "../models/customer-vehicle-model";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";
import { IconRowRemove } from "@tabler/icons-react";
import { EditCustomerVehicleDrawer } from "./edit-vehicle-drawer";

export const vehicleColumns = (service: GenericService<CustomerVehicleModel>, onVehicleUpdated?: () => Promise<void>) :
ColumnDef<CustomerVehicleModel>[]  => [
    {
        accessorKey: 'brand',
        header: 'Marka',
        cell: ({ row }) => row.getValue('brand'),
    },
    {
        accessorKey: 'model',
        header: 'Model',
        cell: ({ row }) => row.getValue('model'),
    },
    {
        accessorKey: 'year',
        header: 'Yıl',
        cell: ({ row }) => row.getValue('year'),
    },
    {
        accessorKey: 'plate',
        header: 'Plaka',
        cell: ({ row }) => row.getValue('plate'),
    },
    {
        accessorKey: 'year',
        header: 'Yıl',
        cell: ({ row }) => row.getValue('year'),
    },
    {
        accessorKey: 'engine',
        header: 'Motor',
        cell: ({ row }) => row.getValue('engine'),
    },
    {
        accessorKey: 'fuelType',
        header: 'Yakıt Tipi',
        cell: ({ row }) => row.getValue('fuelType'),
    },
    {
        accessorKey: 'serialNumber',
        header: 'Şasi No',
        cell: ({ row }) => row.getValue('serialNumber'),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const vehicle = row.original;
            return (
                <div className="flex items-center gap-6">
                    <EditCustomerVehicleDrawer
                        vehicle={vehicle}
                        onVehicleUpdated={onVehicleUpdated} />
                    <IconRowRemove
                        className="cursor-pointer"
                        onClick={() => {
                            service.remove(vehicle.id)
                                .then(() => {
                                    toast.success('Araç başarıyla silindi.');
                                    onVehicleUpdated?.();
                                })
                                .catch(() => {
                                    toast.error('Araç silinirken bir hata oluştu.');
                                });
                        }}
                    />
                </div>
            );
        }
    }
];