"use client";

import { getCurrentTime, TimePicker, type Time } from "@dds-web/components";
import { useState } from "react";

const TestTimePicker = () => {
  const [time, setTime] = useState<Time>(getCurrentTime());

  return (
    <TimePicker
      time={time}
      onChangeTime={setTime}
      title="test 시간 선택"
    />
  )
}

export default TestTimePicker