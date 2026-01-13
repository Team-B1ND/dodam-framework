"use client";

import { useEffect, useState } from "react";
import { useDialogStore } from "./useDialogStore";

export const useDialog = () => {
  const { isOpen, content, dialogs, closeDialog } = useDialogStore();
  const [mountedRoot, setMountedRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let modalRoot = document.getElementById("dds-dialog-root");
    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.id = "dds-dialog-root";
      document.body.appendChild(modalRoot);
    }
    setTimeout(() => {
      setMountedRoot(modalRoot);
    }, 0);

    return () => {
      if (modalRoot && modalRoot.childNodes.length === 0) {
        modalRoot.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (dialogs.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [dialogs.length]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dialogs.length > 0) {
        closeDialog();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [dialogs.length, closeDialog]);

  return {
    isOpen,
    content,
    dialogs,
    closeDialog,
    mountedRoot,
  };
};
