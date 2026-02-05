"use client";

import { TopNavBar } from "dodam-design-system/components";
import { Bell, Gear } from "dodam-design-system/icons/mono";

export const TestTopNavBarBasic = () => (
  <TopNavBar>
    <TopNavBar.Title>홈</TopNavBar.Title>
  </TopNavBar>
);

export const TestTopNavBarWithBackButton = () => (
  <TopNavBar left={<TopNavBar.BackButton onClick={() => alert("뒤로가기")} />}>
    <TopNavBar.Title hasBackButton>설정</TopNavBar.Title>
  </TopNavBar>
);

export const TestTopNavBarWithLogo = () => (
  <TopNavBar>
    <TopNavBar.Logo />
  </TopNavBar>
);

export const TestTopNavBarWithActions = () => (
  <TopNavBar
    left={<TopNavBar.BackButton onClick={() => alert("뒤로가기")} />}
    right={
      <>
        <TopNavBar.IconButton icon={<Bell size={24} />} onClick={() => alert("알림")} />
        <TopNavBar.IconButton icon={<Gear size={24} />} onClick={() => alert("설정")} />
      </>
    }>
    <TopNavBar.Title hasBackButton>프로필</TopNavBar.Title>
  </TopNavBar>
);
