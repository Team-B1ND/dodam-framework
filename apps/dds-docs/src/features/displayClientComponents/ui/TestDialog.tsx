"use client";

import { useOverlay, Dialog } from "dodam-design-system/components";

export const TestDialogBasic = () => {
  const overlay = useOverlay();

  const openDialog = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <Dialog
        open={isOpen}
        title="기본 다이얼로그"
        description="기본적인 다이얼로그입니다. dim을 클릭하면 wiggle 효과가 발생합니다."
        onClose={close}
        onExited={exit}
      >
        <Dialog.FilledButton role="assistive" onClick={close}>
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton onClick={close}>
          확인
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return <button onClick={openDialog}>기본 다이얼로그</button>;
};

export const TestDialogCloseOnDimmer = () => {
  const overlay = useOverlay();

  const openDialog = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <Dialog
        open={isOpen}
        title="dim 클릭으로 닫기"
        description="closeOnDimmerClick이 true로 설정되어 dim을 클릭하면 닫힙니다."
        closeOnDimmerClick
        onClose={close}
        onExited={exit}
      >
        <Dialog.FilledButton onClick={close}>
          확인
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return <button onClick={openDialog}>dim 클릭으로 닫기</button>;
};

export const TestDialogAlert = () => {
  const overlay = useOverlay();

  const openDialog = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <Dialog
        open={isOpen}
        title="알림"
        description="작업이 완료되었습니다."
        onClose={close}
        onExited={exit}
      >
        <Dialog.FilledButton onClick={close}>
          확인
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return <button onClick={openDialog}>알림 다이얼로그</button>;
};

export const TestDialogConfirm = () => {
  const overlay = useOverlay();

  const openDialog = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <Dialog
        open={isOpen}
        title="삭제 확인"
        description="정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        onClose={close}
        onExited={exit}
      >
        <Dialog.FilledButton role="assistive" onClick={close}>
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton role="negative" onClick={close}>
          삭제
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return <button onClick={openDialog}>확인 다이얼로그</button>;
};

export const TestDialogTextButton = () => {
  const overlay = useOverlay();

  const openDialog = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <Dialog
        open={isOpen}
        title="TextButton 사용"
        description="Dialog.TextButton을 사용한 예시입니다."
        onClose={close}
        onExited={exit}
      >
        <Dialog.TextButton onClick={close}>
          나중에
        </Dialog.TextButton>
        <Dialog.FilledButton onClick={close}>
          확인
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return <button onClick={openDialog}>TextButton 다이얼로그</button>;
};

export const TestDialogTextButtonOnly = () => {
  const overlay = useOverlay();

  const openDialog = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <Dialog
        open={isOpen}
        title="TextButton만 사용"
        description="버튼이 하나만 있으면 우측에 정렬됩니다."
        onClose={close}
        onExited={exit}
      >
        <Dialog.TextButton onClick={close}>
          닫기
        </Dialog.TextButton>
      </Dialog>
    ));
  };

  return <button onClick={openDialog}>TextButton만 사용</button>;
};

export const TestDialogNoDescription = () => {
  const overlay = useOverlay();

  const openDialog = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <Dialog
        open={isOpen}
        title="로그아웃 하시겠습니까?"
        onClose={close}
        onExited={exit}
      >
        <Dialog.FilledButton role="assistive" onClick={close}>
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton onClick={close}>
          로그아웃
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return <button onClick={openDialog}>description 없음</button>;
};

const TestDialog = () => {
  const overlay = useOverlay();

  const openDialog = () => {
    overlay.open(({ isOpen, close, exit }) => (
      <Dialog
        open={isOpen}
        title="Test Dialog"
        description="This is a test dialog message."
        onClose={close}
        onExited={exit}
      >
        <Dialog.FilledButton role="assistive" onClick={close}>
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton onClick={close}>
          확인
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return <button onClick={openDialog}>다이어로그 열기</button>;
};

export default TestDialog;
