"use client";

import { PropsWithChildren, ComponentProps, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import * as S from "./style";
import { FilledButton } from "../../../buttons/ui/FilledButton";
import { TextButton } from "../../../buttons/ui/TextButton";

const MotionOverlay = motion.create(S.Overlay);
const MotionModal = motion.create(S.Modal);

interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  closeOnDimmerClick?: boolean;
  onClose?: () => void;
  onExited?: () => void;
}

const DialogComponent = ({
  open,
  title,
  description,
  closeOnDimmerClick = false,
  onClose,
  onExited,
  children,
}: PropsWithChildren<DialogProps>) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (open) {
      controls.start({ opacity: 1, scale: 1, x: 0 });
    }
  }, [open, controls]);

  const wiggle = useCallback(async () => {
    await controls.start({
      x: [0, 4, -4, 3, -3, 0],
      transition: { duration: 0.25, ease: "easeInOut" },
    });
  }, [controls]);

  const handleDimmerClick = () => {
    if (closeOnDimmerClick) {
      onClose?.();
    } else {
      wiggle();
    }
  };

  return (
    <AnimatePresence onExitComplete={onExited}>
      {open && (
        <MotionOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleDimmerClick}
        >
          <MotionModal
            initial={{ opacity: 0, scale: 0.9, x: 0 }}
            animate={controls}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.Content>
              <S.Title>{title}</S.Title>
              {description && <S.Description>{description}</S.Description>}
            </S.Content>
            <S.ButtonContainer>{children}</S.ButtonContainer>
          </MotionModal>
        </MotionOverlay>
      )}
    </AnimatePresence>
  );
};

const DialogFilledButton = (props: ComponentProps<typeof FilledButton>) => (
  <FilledButton size="large" display="fill" {...props} />
);

const DialogTextButton = (props: ComponentProps<typeof TextButton>) => (
  <TextButton size="large" {...props} />
);

export const Dialog = Object.assign(DialogComponent, {
  FilledButton: DialogFilledButton,
  TextButton: DialogTextButton,
});
