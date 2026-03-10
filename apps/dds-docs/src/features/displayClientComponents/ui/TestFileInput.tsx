"use client";

import {
  FileInput,
  FileInputProps,
} from "@b1nd/dodam-design-system/components";
import { useState } from "react";

const TestFileInput = ({
  label = "label",
  supportingText,
  isError = false,
  isDisabled = false,
  accept = "image/*",
  width,
}: Partial<FileInputProps>) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <FileInput
      label={label}
      supportingText={supportingText}
      isError={isError}
      isDisabled={isDisabled}
      accept={accept}
      value={file}
      onChange={setFile}
      width={width}
    />
  );
};

export default TestFileInput;
