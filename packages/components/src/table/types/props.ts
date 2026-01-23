import { ReactNode } from "react";

export type TableKey = [string, string];

export interface TableProps {
  keys: TableKey[]; 
  data: ReactNode[][];
  onRowClick?: (idx: number) => void;
}

export type TableRowData = ReactNode[];
