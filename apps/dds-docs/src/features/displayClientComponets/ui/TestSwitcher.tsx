"use client";

import { Indicator, Switcher, SwitcherProps } from "@dds-web/components";
import { useState } from "react";

const TestSwitcher = (props: SwitcherProps) => {
  const [page, setPage] = useState(0);

  return (
    <>
      <Switcher pages={props.pages} current={page} />
      <Indicator current={page} onChangePage={setPage} total={props.pages?.length} />
    </>
  );
};

export default TestSwitcher;
