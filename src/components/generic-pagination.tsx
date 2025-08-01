"use client";

import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { PaginatedResponse } from "@/core/api/responses/PaginatedResponse";

interface GenericPaginationProps<T> {
  data: PaginatedResponse<T>;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  className?: string;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showInfo?: boolean;
}

export function GenericPagination<T>({
  data,
  onPageChange,
  onPageSizeChange,
  className,
  pageSizeOptions = [10, 20, 50, 100],
  showPageSizeSelector = true,
  showInfo = true,
}: GenericPaginationProps<T>) {
  const currentPage = data.index + 1; // API'den 0-based index geldiği için +1
  const totalPages = data.pages;
  const totalItems = data.count;
  const pageSize = data.size;

  // Sayfa numaralarını hesapla
  const getVisiblePages = () => {
    const delta = 2; // Mevcut sayfa etrafında gösterilecek sayfa sayısı
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page - 1); // API'ye 0-based index gönder
    }
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null; // Tek sayfa varsa pagination gösterme
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Pagination Controls */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2">
          {/* İlk Sayfa */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>

          {/* Önceki Sayfa */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!data.hasPrevious}
            className="h-8 w-8 p-0"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {/* Sayfa Numaraları */}
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-2 py-1 text-sm text-muted-foreground">
                  ...
                </span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page as number)}
                  className="h-8 w-8 p-0"
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}

          {/* Sonraki Sayfa */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!data.hasNext}
            className="h-8 w-8 p-0"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          {/* Son Sayfa */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Info and Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        {/* Sol taraf - Bilgi */}
        {showInfo && (
          <div className="flex items-center gap-2">
            <span>
              Sayfa {currentPage} / {totalPages} (Toplam {totalItems} kayıt)
            </span>
          </div>
        )}

        {/* Sağ taraf - Sayfa boyutu seçici */}
        {showPageSizeSelector && (
          <div className="flex items-center gap-2">
            <span>Sayfa başına:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => onPageSizeChange(parseInt(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
