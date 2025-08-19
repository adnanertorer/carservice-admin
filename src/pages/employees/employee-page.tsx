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
import type { EmployeeModel } from "@/features/employees/models/employee-model";
import { employeeColumns } from "@/features/employees/components/employee-columns";
import { CreateEmployeeDrawer } from "@/features/employees/components/create-employee-drawer";
import { ConfirmDialogShadCn } from "@/core/components/dialogs/alert-dialog";
import { toast } from "react-toastify";
import type {
  MainResponse,
  PaginatedResponse,
} from "@/core/api/responses/PaginatedResponse";
import { usePagination } from "@/hooks/use-pagination";
import { GenericPagination } from "@/components/generic-pagination";
import api from "@/core/api/axios";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from "@/core/consts/consts";
import { EmployeeCard } from "@/features/employees/components/employee-card";

export function EmployeePage() {
  const data: EmployeeModel[] = [];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [employees, setEmployees] = useState<EmployeeModel[]>(data);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  //pagination islemleri
  const [paginationData, setPaginationData] =
    useState<PaginatedResponse<EmployeeModel> | null>(null);
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination(DEFAULT_PAGE_SIZE);

  //satırlardan gelen secili kayitı silmek için
  const [selectedForDelete, setSelectedForDelete] =
    useState<EmployeeModel | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [selectedForDelete]);

  const closeDialog = () => {
    setSelectedForDelete(null);
    setOpen(false);
  };

  const employeeService = useMemo(
    () => new GenericService<EmployeeModel>("employee"),
    []
  );

  const employeesByFilter = useCallback(
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

      const response = await api.get<MainResponse<EmployeeModel>>(
        `/employee/list?${params.toString()}`
      );

      if (response.data.succeeded && response.data.data?.items) {
        setEmployees(response.data.data?.items);
        setPaginationData(response.data.data);
      }
    },
    []
  );

  const fetchEmployees = useCallback(async () => {
    employeesByFilter(currentPage, pageSize, "", false);
  }, [currentPage, pageSize, employeesByFilter]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const onPageChange = (page: number) => {
    handlePageChange(page);
    employeesByFilter(currentPage, pageSize, "", false);
  };

  const onPageSizeChange = (newPageSize: number) => {
    handlePageSizeChange(newPageSize);
    employeesByFilter(currentPage, pageSize, "", false);
  };

  const columns = useMemo(
    () =>
      employeeColumns(fetchEmployees, (item) => {
        setSelectedForDelete(item);
      }),
    [fetchEmployees]
  );

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const table = useReactTable<EmployeeModel>({
    data: employees,
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
    <div className="w-full">
      <h3 style={{ padding: "10px" }}>Personeller</h3>
      <ColumnFilterInput
        table={table}
        columnKey="name"
        placeholder="Filter names..."
      />
      <div className="rounded-md border">
        <div className="p-2">
          <CreateEmployeeDrawer onEmployeeCreated={fetchEmployees} />
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
          <h3 style={{ padding: "10px" }}>Müşteriler</h3>
          {employees.length > 0 ? (
            <div className="space-y-3">
              {employees.map((employee) => (
                <EmployeeCard
                  onEmployeeUpdated={fetchEmployees}
                  onDeleteRequest={(item) => {
                    setSelectedForDelete(item);
                  }}
                  key={employee.id}
                  employee={employee}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Kayıt bulunamadı.
            </div>
          )}
        </div>
        {selectedForDelete && (
          <ConfirmDialogShadCn
            open={open}
            title={`${selectedForDelete.name} ${selectedForDelete.surname} Çalışan Silme`}
            description={`Bu çalışanı silmek istediğinize emin misiniz?`}
            actionText="Evet"
            cancelText="Hayır"
            onCancel={closeDialog}
            onConfirm={async () => {
              const response = await employeeService.remove(
                selectedForDelete.id
              );
              console.log("Kayıt silme yanıtı:", response);
              if (response.succeeded) {
                toast.success("Kayıt silindi!");
                fetchEmployees();
              } else {
                toast.error(
                  response.errors?.[0] || "Kayıt silinirken bir hata oluştu!"
                );
              }
              setSelectedForDelete(null);
              setOpen(false);
            }}
          />
        )}
      </div>
      <div className="mt-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
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
      </div>
    </div>
  );
}
