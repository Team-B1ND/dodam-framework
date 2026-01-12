import { Time } from "./time";

export interface DatePickerProps {
  date?: Date;
  onChangeDate?: (date: Date) => void;
  disablePast?: boolean;
  title?: string;
}

export interface TimePickerProps {
  title?: string;
  time: Time;
  onChangeTime: (time: Time) => void;
};