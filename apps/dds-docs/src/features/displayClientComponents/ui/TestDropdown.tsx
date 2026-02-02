"use client";

import { useState } from "react";
import { Dropdown } from "dodam-design-system/components";

const TestDropdown = () => {
  const [selected, setSelected] = useState<string>("Option 1");
  const items = ["Option 1", "Option 2", "Option 3", "Option 4"];

  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        items={items}
        value={selected}
        onSelectedItemChange={setSelected}
      />
      <p className="text-text-secondary">Selected: {selected}</p>
    </div>
  );
};

export default TestDropdown;
