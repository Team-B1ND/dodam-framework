"use client";

import { Tag } from "@b1nd/dodam-design-system/components";

const TestTag = () => {
  const handleClick = () => {
    alert("Tag clicked!");
  };

  return (
    <div className="flex gap-4">
      <Tag text="Default" color="default" />
      <Tag text="Blue" color="blue" />
      <Tag text="Red" color="red" />
      <Tag text="Clickable" color="blue" onClick={handleClick} />
    </div>
  );
};

export default TestTag;
