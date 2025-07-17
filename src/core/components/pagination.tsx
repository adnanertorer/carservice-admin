
import { Pagination } from "@/components/pagination";
import { PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {
  type Table,
} from "@tanstack/react-table";

interface PaginationProps<T> {
  table: Table<T>;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
  currentIndex: number;
}

export function CustomPagination<T>({ table, setPageIndex, setPageSize, currentIndex }: PaginationProps<T>) {
  return (
    <>
      <Pagination table={table} />
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPageIndex(currentIndex - 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => setPageIndex(0)}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => setPageIndex(1)} isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => setPageIndex(2)}>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </>
  )
}