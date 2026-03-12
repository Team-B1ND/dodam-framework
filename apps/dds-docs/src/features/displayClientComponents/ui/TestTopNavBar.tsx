"use client";

import { TopNavBar } from "@b1nd/dodam-design-system/components";
import { Bell, Gear } from "@b1nd/dodam-design-system/icons/mono";

export const TestTopNavBarBasic = () => (
  <TopNavBar>
    <TopNavBar.Title>홈</TopNavBar.Title>
  </TopNavBar>
);

export const TestTopNavBarWithBackButton = () => (
  <TopNavBar left={<TopNavBar.BackButton />}>
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
    left={<TopNavBar.BackButton />}
    right={
      <>
        <TopNavBar.IconButton icon={<Bell />} />
        <TopNavBar.IconButton icon={<Gear />} />
      </>
    }>
    <TopNavBar.Title hasBackButton>프로필</TopNavBar.Title>
  </TopNavBar>
);
