"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { GenericService } from "@/core/services/GenericService";
import { TableHeaders } from "@/components/table-header";
import { Pagination } from "@/components/pagination";
import type { SubServiceModel } from "@/features/sub-services/models/sub-service-model";
import { SubServiceColumns } from "@/features/sub-services/components/sub-service-columns";
import { useParams } from "react-router-dom";
import { CreateSubServiceDrawer } from "@/features/sub-services/components/create-subservice-drawer";
import api from "@/core/api/axios";
import type { MainResponse } from "@/core/api/responses/PaginatedResponse";
import type { MainServiceModel } from "@/features/main-services/models/main-service-model";
import { useEffect, useMemo, useState } from "react";
import type { SubTotalModel } from "@/features/sub-services/models/sub-total-model";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import { Button } from "@/components/ui/button";

export function SubServicePage() {
  const data: SubServiceModel[] = [];

  const { id } = useParams<{ id: string }>(); //url den id yi al

  const [mainService, setMainService] = useState<MainServiceModel | null>(null);
  const [subTotal, setSubTotal] = useState<SubTotalModel | null>(null);

  //table column fonksiyonellikleri
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  //sub service verileri
  const [subServices, setSubServices] = useState<SubServiceModel[]>(data);
  //sub service api servisi
  const subServiceApiService = useMemo(
    () => new GenericService<SubServiceModel>("subservice"),
    []
  );
  //main service api servisi
  const mainServiceApiService = useMemo(
    () => new GenericService<MainServiceModel>("mainservice"),
    []
  );

  useEffect(() => {
    if (!id) {
      console.error("Main service ID is not provided.");
      return;
    }
    api
      .get<ISingleResponse<SubTotalModel>>(`mainservice/sub-totals/${id}`)
      .then((res) => {
        if (res.data.succeeded) {
          setSubTotal(res.data.data ?? null);
        } else {
          console.error("Failed to fetch sub total data.");
        }
      });
  }, [id]);

  useEffect(() => {
    if (!id) {
      console.error("Main service ID is not provided.");
      return;
    }
    mainServiceApiService
      .getById(id)
      .then((res) => {
        if (res.succeeded && res.data) {
          setMainService(res.data);
        } else {
          console.error("Failed to fetch main service data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching main service data:", error);
      });
  }, [id, mainServiceApiService]);

  const fetchSubServices = React.useCallback(async () => {
    const res = await api.get<MainResponse<SubServiceModel>>(
      `subservice/list/?pageIndex=0&pageSize=50&isAllItems=false&mainServiceId=${id}`
    );
    if (res.data.succeeded && res.data.data?.items) {
      setSubServices(res.data.data?.items);
    }
  }, [id]);

  const subServiceColumns = useMemo(
    () => SubServiceColumns(subServiceApiService, fetchSubServices),
    [subServiceApiService, fetchSubServices]
  );

  useEffect(() => {
    fetchSubServices();
  }, [fetchSubServices]);

  const table = useReactTable<SubServiceModel>({
    data: subServices,
    columns: subServiceColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
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
      <div className="rounded-md border">
        {mainService && (
          <div className="p-4 border-b">
            <h4 className="text-lg font-semibold">
              {mainService.vehicle?.plate} {mainService.vehicle?.brand}
              {mainService.vehicle?.model} Servis Kartı Detayları
            </h4>
            <p style={{ fontSize: "small" }}>{mainService.description}</p>
            <p style={{ fontSize: "small" }}>
              Servis Durumu:{" "}
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
          </div>
        )}
        <div className="p-2">
          <CreateSubServiceDrawer
            key={id}
            onSubServiceCreated={fetchSubServices}
            mainServiceId={id ?? ""}
          />
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
                  colSpan={subServiceColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
      {mainService && (
        <>
          <div className="p-4 border-b ml-4 mr-4" style={{ float: "left" }}>
            <p style={{ fontSize: "small" }}>
              İşlemlerin tümünü tamamladıysanız onayla butonuna basınız. Böylece tutarlar
              işlem kartına ve cari harekete yansıyacaktır.
            </p>
          </div>
          <div className="p-4 border-b ml-4 mr-4" style={{ float: "right" }}>
            <p style={{ fontSize: "small" }}>
              Toplam İndirim: {subTotal?.totalDiscount}
            </p>
            <p style={{ fontSize: "small" }}>
              Toplam Maliyet: {subTotal?.totalCost}
            </p>
            <p style={{ fontSize: "small" }}>
              Toplam Tutar: {subTotal?.totalPrice}
            </p>

            <Button className="mt-10" style={{ float: "right" }} value={"Onayla"}>Onayla</Button>
          </div>
        </>
      )}
    </div>
  );
}
