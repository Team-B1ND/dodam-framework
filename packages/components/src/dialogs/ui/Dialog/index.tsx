"use client";

import { DialogItem } from "../../types/dialog-item";
import * as S from "./style";

interface Props {
  dialog: DialogItem;
  index: number;
  baseZIndex: number;
  closeDialog: () => void;
  dialogs: DialogItem[];
}

const Dialog = ({ dialog, index, baseZIndex, closeDialog, dialogs }: Props) => {
  return (
    <S.Overlay
      key={dialog.id}
      $zIndex={baseZIndex + index}
      onClick={index === dialogs.length - 1 ? closeDialog : undefined}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Content>
          <S.Title>{dialog.content.title}</S.Title>
          <S.Message>{dialog.content.message}</S.Message>
        </S.Content>
        <S.Buttons>{dialog.content.buttons || null}</S.Buttons>
      </S.Modal>
    </S.Overlay>
  );
};

export default Dialog;
