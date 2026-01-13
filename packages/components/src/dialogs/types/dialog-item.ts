export interface DialogItem {
  id: string;
  content: Dialog;
}

export interface Dialog {
  title: string;
  message: string;
  buttons?: React.ReactNode[];
}