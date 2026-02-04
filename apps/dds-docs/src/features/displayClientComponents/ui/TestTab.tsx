"use client";

import { Tab } from "dodam-design-system/components";
import { useState } from "react";

interface TestTabProps {
  itemGap?: number;
  fluid?: boolean;
  itemCount?: number;
}

const TestTab = ({ itemGap, fluid = false, itemCount = 3 }: TestTabProps) => {
  const [selected, setSelected] = useState(0);
  const items = Array.from({ length: itemCount }, (_, i) => `탭 ${i + 1}`);

  return (
    <Tab itemGap={itemGap} fluid={fluid} onChange={setSelected}>
      {items.map((label, index) => (
        <Tab.Item key={index} selected={selected === index}>
          {label}
        </Tab.Item>
      ))}
    </Tab>
  );
};

export default TestTab;
