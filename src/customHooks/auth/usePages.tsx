import { useEffect, useMemo, useState } from "react";

type UsePagesProps<T> = {
  rows: T[];
  searchFn: (row: T, query: string) => boolean;
  itemsPerPage?: number;
};

export function usePages<T>({
  rows,
  searchFn,
  itemsPerPage = 10,
}: UsePagesProps<T>) {
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredRows = useMemo(() => {
    if (!submittedQuery) return rows;

    const q = submittedQuery.toLowerCase();
    return rows.filter((row) => searchFn(row, q));
  }, [rows, submittedQuery, searchFn]);

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const paginatedRows = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredRows.slice(start, end);
  }, [filteredRows, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [submittedQuery]);

  return {
    paginatedRows,
    totalPages,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    submittedQuery,
    setSubmittedQuery,
  };
}
