"use client";

import { Indicator, Switcher, SwitcherProps } from "dodam-design-system/components";
import { useState } from "react";

const TestSwitcher = (props: SwitcherProps) => {
  const [page, setPage] = useState(0);

  return (
    <div>
      <Switcher pages={props.pages} current={page} animated={props.animated} />
      <Indicator current={page} onChangePage={setPage} total={props.pages?.length} />
    </div>
  );
};

export default TestSwitcher;
