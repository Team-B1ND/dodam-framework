"use client";

import { DatePicker, DatePickerProps } from "@dds-web/components";
import { useState } from "react";

const TestDatePicker = (props: DatePickerProps) => {
  const [date, setDate] = useState(new Date());

  return <DatePicker date={date} onChangeDate={setDate} {...props} />;
}

export default TestDatePicker;