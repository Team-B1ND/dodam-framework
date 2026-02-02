"use client";

import { createPortal } from "react-dom";
import { useDialog } from "../../hooks/useDialog";
import { DialogProviderProps } from "../../types/props";
import Dialog from "../Dialog";

export const DialogProvider = ({ baseZIndex = 10000 }: DialogProviderProps) => {
  const { dialogs, closeDialog, mountedRoot } = useDialog();

  if (dialogs.length === 0 || !mountedRoot) return null;

  return createPortal(
    <>
      {dialogs.map((dialog, index) => (
        <Dialog
          key={index}
          dialog={dialog}
          index={index}
          baseZIndex={baseZIndex}
          closeDialog={closeDialog}
          dialogs={dialogs}
        />
      ))}
    </>,
    mountedRoot
  );
};
