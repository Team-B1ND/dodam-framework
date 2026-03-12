"use client";

import { Progress, CircularProgress } from "@b1nd/dodam-design-system/components";
import { useState, useEffect } from "react";

export const TestProgress = () => {
  const [progress, setProgress] = useState(30);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      <Progress progress={progress} />
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export const TestCircularProgress = () => {
  const [progress, setProgress] = useState(60);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <CircularProgress progress={progress} />
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        style={{ width: 200 }}
      />
    </div>
  );
};

export const TestProgressDisabled = () => <Progress progress={50} disabled />;

export const TestCircularProgressDisabled = () => <CircularProgress progress={50} disabled />;

