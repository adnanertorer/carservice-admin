import * as React from "react";

// Hook for easier pagination state management
export function usePagination(initialPageSize: number = 10) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(initialPageSize);

  const handlePageChange = React.useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = React.useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(0);
  }, []);

  const resetPagination = React.useCallback(() => {
    setCurrentPage(0);
  }, []);

  return {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    resetPagination,
  };
}
