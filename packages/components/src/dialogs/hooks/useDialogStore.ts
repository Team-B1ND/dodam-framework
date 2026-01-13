"use client";

import { create } from "zustand";
import { ReactNode } from "react";
import { Dialog, DialogItem } from "../types/dialog-item";



interface DialogState {
  isOpen: boolean;
  content: Dialog | null;
  dialogs: DialogItem[];
  openDialog: (content: Dialog) => void;
  closeDialog: () => void;
  closeAllDialog: () => void;
}

export const useDialogStore = create<DialogState>((set, get) => ({
  isOpen: false,
  content: null,
  dialogs: [],
  openDialog: (content) => {
    const id = crypto.randomUUID();
    const newDialogs = [...get().dialogs, { id, content }];
    set({
      isOpen: true,
      content: newDialogs[newDialogs.length - 1].content,
      dialogs: newDialogs,
    });
  },
  closeDialog: () => {
    const currentDialogs = get().dialogs;
    if (currentDialogs.length <= 1) {
      set({ isOpen: false, content: null, dialogs: [] });
    } else {
      const newDialogs = currentDialogs.slice(0, -1);
      set({
        isOpen: true,
        content: newDialogs[newDialogs.length - 1].content,
        dialogs: newDialogs,
      });
    }
  },
  closeAllDialog: () => {
    set({ isOpen: false, content: null, dialogs: [] });
  },
}));
