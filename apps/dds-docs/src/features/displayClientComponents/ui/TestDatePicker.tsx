"use client";

import { DatePicker, DatePickerProps } from "dodam-design-system/components";
import { useState } from "react";

const TestDatePicker = (props: DatePickerProps) => {
  const [date, setDate] = useState(new Date());

  return <DatePicker date={date} onChangeDate={setDate} {...props} />;
}

export default TestDatePicker;