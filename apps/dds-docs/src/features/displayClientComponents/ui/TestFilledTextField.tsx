"use client";

import { useState } from "react";
import { FilledTextField } from "dodam-design-system/components";

export default function TestFilledTextField() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [disabledValue, setDisabledValue] = useState("Disabled value");
  const [noIconValue, setNoIconValue] = useState("");
  const [customWidthValue, setCustomWidthValue] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailValue(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(value.length > 0 && !emailRegex.test(value));
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          1. 기본 Text 입력
        </h3>
        <FilledTextField
          type="text"
          label="텍스트 입력"
          placeholder="텍스트를 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onRemoveClick={() => setText("")}
        />
        <p style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
          입력된 값: {text}
        </p>
      </div>

      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          2. Password 입력
        </h3>
        <FilledTextField
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
          입력된 값: {password}
        </p>
      </div>

      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          3. Error 상태 (이메일 유효성 검사)
        </h3>
        <FilledTextField
          type="text"
          label="이메일"
          placeholder="example@domain.com"
          value={emailValue}
          onChange={handleEmailChange}
          onRemoveClick={() => {
            setEmailValue("");
            setEmailError(false);
          }}
          isError={emailError}
          supportingText={
            emailError ? "올바른 이메일 형식이 아닙니다." : "example@domain.com"
          }
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          4. Disabled 상태
        </h3>
        <FilledTextField
          type="text"
          label="비활성화된 필드"
          placeholder="비활성화된 필드"
          value={disabledValue}
          onChange={(e) => setDisabledValue(e.target.value)}
          isDisabled
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          5. 아이콘 숨김
        </h3>
        <FilledTextField
          type="text"
          label="아이콘 없음"
          placeholder="텍스트를 입력하세요"
          value={noIconValue}
          onChange={(e) => setNoIconValue(e.target.value)}
          showIcon={false}
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          6. 커스텀 너비 (300px)
        </h3>
        <FilledTextField
          type="text"
          label="커스텀 너비"
          placeholder="텍스트를 입력하세요"
          value={customWidthValue}
          onChange={(e) => setCustomWidthValue(e.target.value)}
          onRemoveClick={() => setCustomWidthValue("")}
          width={300}
        />
      </div>
    </div>
  );
}
