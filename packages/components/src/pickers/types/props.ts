export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: Date;
  onChangeDate?: (date: Date) => void;
  disablePast?: boolean;
  title?: string;
}