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

export function EmployeePage() {
  const data: EmployeeModel[] = [];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [employees, setEmployees] = useState<EmployeeModel[]>(data);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

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

  const fetchEmployees = useCallback(async () => {
    const response = await employeeService.getByFilter(
      undefined,
      undefined,
      0,
      10,
      "",
      false
    );
    if (
      response.succeeded &&
      response.data?.items &&
      response.data?.items.length > 0
    ) {
      setEmployees(response.data?.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

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
      <ColumnFilterInput
        table={table}
        columnKey="name"
        placeholder="Filter names..."
      />
      <div className="rounded-md border">
        <div className="p-2">
          <CreateEmployeeDrawer onEmployeeCreated={fetchEmployees} />
        </div>
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
    </div>
  );
}
