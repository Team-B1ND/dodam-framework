"use client";

import { useState } from "react";
import { Dropdown } from "@b1nd/dodam-design-system/components";

const TestDropdown = () => {
  const [selected, setSelected] = useState<string>("option1");
  const items = [
    { name: "Option 1", value: "option1" },
    { name: "Option 2", value: "option2" },
    { name: "Option 3", value: "option3" },
    { name: "Option 4", value: "option4" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        items={items}
        value={selected}
        onSelectedItemChange={(item) => setSelected(item.value)}
      />
      <p className="text-text-secondary">Selected: {selected}</p>
    </div>
  );
};

export default TestDropdown;
