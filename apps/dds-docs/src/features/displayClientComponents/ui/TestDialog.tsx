"use client";

import { dialog } from "dodam-design-system/components";

const TestDialog = () => {
  const openDialog = () => {
    dialog.open({
      title: "Test Dialog",
      message: "This is a test dialog message.",
      buttons: [
        <button key="ok" onClick={dialog.close}>OK</button>,
        <button key="cancel" onClick={dialog.close}>Cancel</button>,
      ],
    });
  }

  return (
    <button onClick={openDialog}>다이어로그 열기</button>
  )
}

export default TestDialog