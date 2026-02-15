import { useEffect, useMemo, useState } from "react";

type UsePagesProps<T> = {
  rows: T[];
  searchFn: (row: T, query: string) => boolean;
  searchQuery?: string;
  itemsPerPage?: number;
};

export function usePages<T>({
  rows,
  searchFn,
  searchQuery,
  itemsPerPage = 10,
}: UsePagesProps<T>) {
  const [internalQuery, setInternalQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const effectiveQuery =
    searchQuery !== undefined ? searchQuery : internalQuery;

  const filteredRows = useMemo(() => {
    if (!effectiveQuery) return rows;

    const q = effectiveQuery.toLowerCase();
    return rows.filter((row) => searchFn(row, q));
  }, [rows, effectiveQuery, searchFn]);

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const paginatedRows = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredRows.slice(start, end);
  }, [filteredRows, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [effectiveQuery]);

  return {
    paginatedRows,
    totalPages,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    submittedQuery: internalQuery,
    setSubmittedQuery: setInternalQuery,
  };
}
