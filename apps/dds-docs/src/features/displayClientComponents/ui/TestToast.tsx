"use client";

import { FilledButton, useToast, ToastProvider } from "@b1nd/dodam-design-system/components";
import { LoudSpeaker } from "@b1nd/dodam-design-system/icons/illustration";

export const TestToastBasic = () => {
  const toast = useToast();

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <FilledButton size="small" onClick={() => toast("기본 토스트 메시지예요")}>
        기본 토스트
      </FilledButton>
      <FilledButton size="small" onClick={() => toast("상단 토스트 메시지예요", { position: "top" })}>
        상단 토스트
      </FilledButton>
    </div>
  );
};

export const TestToastTypes = () => {
  const toast = useToast();

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <FilledButton size="small" onClick={() => toast.success("성공 토스트예요")}>
        성공 토스트
      </FilledButton>
      <FilledButton size="small" onClick={() => toast.error("에러 토스트예요")}>
        에러 토스트
      </FilledButton>
      <FilledButton size="small" onClick={() => toast.warning("경고 토스트예요")}>
        경고 토스트
      </FilledButton>
    </div>
  );
};

export const TestToastDuration = () => {
  const toast = useToast();

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <FilledButton size="small" onClick={() => toast("1초 후 사라져요", { duration: 1000 })}>
        1초 토스트
      </FilledButton>
      <FilledButton size="small" onClick={() => toast("5초 후 사라져요", { duration: 5000 })}>
        5초 토스트
      </FilledButton>
    </div>
  );
};

export const TestToastCustomIcon = () => {
  const toast = useToast();

  return (
    <FilledButton size="small" onClick={() => toast("커스텀 아이콘 토스트예요", { icon: <LoudSpeaker size={20} /> })}>
      커스텀 아이콘
    </FilledButton>
  );
};

export { ToastProvider };
