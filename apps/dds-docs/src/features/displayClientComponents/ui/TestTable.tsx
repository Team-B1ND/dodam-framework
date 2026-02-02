"use client";

import { useState } from "react";
import { Table } from "dodam-design-system/components";

const TestTable = () => {
  const keys = [
    ["이름", "160px"],
    ["나이", "80px"],
    ["설명", "FULL"],
  ] as const;

  const [rows] = useState([
    ["홍길동", 28, "프론트엔드 개발자"],
    ["김철수", 34, "디자인 및 UI 담당"],
    ["이영희", 25, "백엔드 개발자"],
  ]);

  return (
    <div style={{ width: "100%" }}>
      <Table
        keys={keys as any}
        data={rows as any}
        onRowClick={(i: number) => console.log("row clicked:", i)}
      />
    </div>
  );
};

export default TestTable;
