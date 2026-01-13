import { useDialogStore } from "../hooks/useDialogStore";
import { Dialog } from "../types/dialog-item";

export const dialog = {
  open: (content: Dialog): void => {
    useDialogStore.getState().openDialog(content);
  },
  close: (): void => {
    useDialogStore.getState().closeDialog();
  },
  closeAll: (): void => {
    useDialogStore.getState().closeAllDialog();
  },
};
