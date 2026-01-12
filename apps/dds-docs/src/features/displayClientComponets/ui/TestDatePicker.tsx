"use client";

import { DatePicker } from "@dds-web/components";
import { useState } from "react";

const TestDatePicker = () => {
  const [date, setDate] = useState(new Date());

  return <DatePicker date={date} onChangeDate={setDate} title="test 날짜 선택" disablePast />;
}

export default TestDatePicker;