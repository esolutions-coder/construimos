import { useMemo } from "react";

type UseDateFilterProps<T> = {
  rows: T[];
  startDateStr: string;
  endDateStr: string;
  getDate: (row: T) => Date | null;
};

export function useDateFilter<T>({
  rows,
  startDateStr,
  endDateStr,
  getDate,
}: UseDateFilterProps<T>) {
  const startDate = useMemo(() => {
    if (!startDateStr) return null;
    const d = new Date(startDateStr + "T00:00:00");
    return isNaN(d.getTime()) ? null : d;
  }, [startDateStr]);

  const endDateExclusive = useMemo(() => {
    if (!endDateStr) return null;
    const d = new Date(endDateStr + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    d.setDate(d.getDate() + 1);
    return d;
  }, [endDateStr]);

  const filteredByDate = useMemo(() => {
    if (!startDate && !endDateExclusive) return rows;

    return rows.filter((row) => {
      const fecha = getDate(row);
      if (!fecha) return false;

      const t = fecha.getTime();

      if (startDate && t < startDate.getTime()) return false;
      if (endDateExclusive && t >= endDateExclusive.getTime()) return false;

      return true;
    });
  }, [rows, startDate, endDateExclusive, getDate]);

  return {
    filteredByDate,
  };
}
