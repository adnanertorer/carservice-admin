import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { GenericService } from "@/core/services/GenericService";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnFilterInput } from "@/components/table-filter";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TableHeaders } from "@/components/table-header";
import { useNavigate, useParams } from "react-router-dom";
import type { CustomerVehicleModel } from "@/features/customer-vehicles/models/customer-vehicle-model";
import { vehicleColumns } from "@/features/customer-vehicles/components/vehicle-columns";
import { CreateVehicleDrawer } from "@/features/customer-vehicles/components/create-vehicle-drawer";
import { ConfirmDialogShadCn } from "@/core/components/dialogs/alert-dialog";
import { toast } from "react-toastify";
import type {
  MainResponse,
  PaginatedResponse,
} from "@/core/api/responses/PaginatedResponse";
import { usePagination } from "@/hooks/use-pagination";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from "@/core/consts/consts";
import api from "@/core/api/axios";
import { GenericPagination } from "@/components/generic-pagination";
import { CustomerVehicleCard } from "@/features/customer-vehicles/components/vehicle-card";

export function CustomerVehiclePage() {
  const navigate = useNavigate();
  const data: CustomerVehicleModel[] = [];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [vehicles, setVehicles] = useState<CustomerVehicleModel[]>(data);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const { customerId } = useParams<{ customerId: string }>();

  //pagination islemleri
  const [paginationData, setPaginationData] =
    useState<PaginatedResponse<CustomerVehicleModel> | null>(null);
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination(DEFAULT_PAGE_SIZE);

  //satırlardan gelen secili kayitı silmek için
  const [selectedForDelete, setSelectedForDelete] =
    useState<CustomerVehicleModel | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [selectedForDelete]);

  const closeDialog = () => {
    setSelectedForDelete(null);
    setOpen(false);
  };

  const vehicleService = useMemo(
    () => new GenericService<CustomerVehicleModel>("vehicle"),
    []
  );

  const vehiclesByFilter = useCallback(
    async (
      pageNumber: number,
      pageSize: number,
      searchText: string,
      isAll: boolean
    ) => {
      const params = new URLSearchParams();

      params.append("pageSize", pageSize.toString());
      params.append("pageIndex", pageNumber.toString());
      params.append("IsAllItems", isAll.toString());
      params.append("search", searchText);
      params.append("customerId", customerId ?? "");

      const response = await api.get<MainResponse<CustomerVehicleModel>>(
        `/vehicle/list?${params.toString()}`
      );

      if (response.data.succeeded && response.data.data?.items) {
        setVehicles(response.data.data?.items);
        setPaginationData(response.data.data);
      }
    },
    [customerId]
  );

  const fetchVehicles = useCallback(async () => {
    vehiclesByFilter(currentPage, pageSize, "", false);
  }, [currentPage, pageSize, vehiclesByFilter]);

  const onPageChange = (page: number) => {
    handlePageChange(page);
    vehiclesByFilter(currentPage, pageSize, "", false);
  };

  const onPageSizeChange = (newPageSize: number) => {
    handlePageSizeChange(newPageSize);
    vehiclesByFilter(currentPage, pageSize, "", false);
  };

  const columns = useMemo(
    () =>
      vehicleColumns(fetchVehicles, navigate, (item) => {
        setSelectedForDelete(item);
      }),
    [fetchVehicles, navigate]
  );

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const table = useReactTable<CustomerVehicleModel>({
    data: vehicles,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full rounded-md border">
      <ColumnFilterInput
        table={table}
        columnKey="brand"
        placeholder="Filter brands..."
      />
      <div className="p-2">
        <CreateVehicleDrawer onVehicleCreated={fetchVehicles} />
      </div>
      <div className="hidden md:block rounded-md border mt-4">
        <Table>
          <TableHeaders table={table} />
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Mobil Card Görünümü */}
      <div className="md:hidden mt-4">
        {vehicles.length > 0 ? (
          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <CustomerVehicleCard
                onVehicleUpdated={fetchVehicles}
                onDeleteRequest={(item) => {
                  setSelectedForDelete(item);
                  setOpen(true);
                }}
                key={vehicle.id}
                vehicle={vehicle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Kayıt bulunamadı.
          </div>
        )}
      </div>
      <div className="order-1 lg:order-2 w-full lg:w-auto">
        {paginationData ? (
          <GenericPagination
            data={paginationData}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
            showPageSizeSelector={true}
            showInfo={true}
          />
        ) : (
          <div className="text-sm text-gray-500">
            Sayfalama verisi yükleniyor...
          </div>
        )}
      </div>
      {selectedForDelete && (
        <ConfirmDialogShadCn
          open={open}
          title={`${selectedForDelete.plate} ${selectedForDelete.brand} ${selectedForDelete.model} Araç Silme`}
          description={`Bu aracı silmek istediğinize emin misiniz?`}
          actionText="Evet"
          cancelText="Hayır"
          onCancel={closeDialog}
          onConfirm={async () => {
            const response = await vehicleService.remove(selectedForDelete.id);
            if (response.succeeded) {
              toast.success("Kayıt silindi!");
              await fetchVehicles();
            } else {
              toast.error(
                response.errors?.[0] ?? "Silme sırasında hata oluştu."
              );
            }
            setSelectedForDelete(null);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
