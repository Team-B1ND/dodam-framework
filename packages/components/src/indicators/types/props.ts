export interface IndicatorProps {
  size?: number;
  color?: string;
  current?: number;
  total?: number;
  onChangePage?: (page: number) => void;
}

export interface SwitcherProps {
  pages?: React.ReactNode[];
  current?: number;
}