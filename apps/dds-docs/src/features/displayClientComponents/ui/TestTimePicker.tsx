"use client";

import {
  getCurrentTime,
  TimePicker,
  TimePickerProps,
  type Time,
} from "dodam-design-system/components";
import { useState } from "react";

const TestTimePicker = (props: TimePickerProps) => {
  const [time, setTime] = useState<Time>(getCurrentTime());

  return <TimePicker {...props} time={time} onChangeTime={setTime} />;
};

export default TestTimePicker;
