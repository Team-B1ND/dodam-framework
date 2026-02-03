"use client";

import { PropsWithChildren, ComponentProps, useCallback, useEffect, memo, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as S from "./style";
import { FilledButton } from "../../../buttons";
import { TextButton } from "../../../buttons";
import { useDialogAnimation } from "../../animations/useDialogAnimation";
import { OverlayContext } from "../../../overlay/OverlayContext";

const MotionModal = motion.create(S.Modal);

interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  closeOnDimmerClick?: boolean;
  onClose?: () => void;
  onExited?: () => void;
}

const DialogComponent = memo(({
  open,
  title,
  description,
  closeOnDimmerClick = false,
  onClose,
  onExited,
  children,
}: PropsWithChildren<DialogProps>) => {
  const context = useContext(OverlayContext);
  const {
    controls,
    wiggle,
    modalInitial,
    modalExit,
    modalTransition,
  } = useDialogAnimation({ open });

  const handleDimmerClick = useCallback(() => {
    if (closeOnDimmerClick) {
      onClose?.();
    } else {
      wiggle();
    }
  }, [closeOnDimmerClick, onClose, wiggle]);

  useEffect(() => {
    if (open) {
      context?.setDimClickHandler(handleDimmerClick);
    }
  }, [open, context, handleDimmerClick]);

  return (
    <AnimatePresence onExitComplete={onExited}>
      {open && (
        <MotionModal
          initial={modalInitial}
          animate={controls}
          exit={modalExit}
          transition={modalTransition}
        >
          <S.Content>
            <S.Title>{title}</S.Title>
            {description && <S.Description>{description}</S.Description>}
          </S.Content>
          <S.ButtonContainer>{children}</S.ButtonContainer>
        </MotionModal>
      )}
    </AnimatePresence>
  );
});

DialogComponent.displayName = "Dialog";

const DialogFilledButton = memo((props: ComponentProps<typeof FilledButton>) => (
  <FilledButton size="large" display="fill" {...props} />
));

DialogFilledButton.displayName = "Dialog.FilledButton";

const DialogTextButton = memo((props: ComponentProps<typeof TextButton>) => (
  <TextButton size="large" {...props} />
));

DialogTextButton.displayName = "Dialog.TextButton";

export const Dialog = Object.assign(DialogComponent, {
  FilledButton: DialogFilledButton,
  TextButton: DialogTextButton,
});
