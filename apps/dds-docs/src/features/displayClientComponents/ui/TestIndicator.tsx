"use client";

import { Indicator, IndicatorProps } from "@dds-web/components";
import { useState } from "react";

const TestIndicator = (props: IndicatorProps) => {
  const [page, setPage] = useState(0);

  return <Indicator {...props} current={page} onChangePage={setPage} />;
};

export default TestIndicator;
