"use client";

import { PropsWithChildren } from "react";

const ComponentBlock = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-background-surface border border-border-normal rounded-lg my-6">{children}</div>
  )
}

export default ComponentBlock