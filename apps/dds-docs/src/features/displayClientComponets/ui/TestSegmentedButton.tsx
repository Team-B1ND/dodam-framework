"use client"

import { SegmentedButton, SegmentedButtonData } from "dodam-design-system/components"
import { useState } from "react"

const TestSegmentedButton = () => {
  const [data, setData] = useState<SegmentedButtonData[]>([
    { text: "텍스트 1", isActive: true, value: "first" },
    { text: "텍스트 2", isActive: false, value: "second" },
    { text: "텍스트 3", isActive: false, value: "third" },
  ]);
  return (
    <SegmentedButton data={data} setData={setData} />
  )
}

export default TestSegmentedButton