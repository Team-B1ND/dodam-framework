"use client";

import { useState } from "react";
import { TextField } from "dodam-design-system/components";

export default function TestTextField() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [disabledEmptyValue, setDisabledEmptyValue] = useState("");
  const [noIconValue, setNoIconValue] = useState("");
  const [customWidthValue, setCustomWidthValue] = useState("");
  const [customLabelValue, setCustomLabelValue] = useState("");

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
        <TextField
          id="text-1"
          name="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onRemoveClick={() => setText("")}
          label="텍스트를 입력하세요"
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
        <TextField
          id="password-1"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="비밀번호를 입력하세요."
        />
        <p style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
          입력된 값: {password}
        </p>
      </div>

      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          3. Enter 키 이벤트
        </h3>
        <TextField
          id="enter-1"
          name="enter"
          type="text"
          value={customWidthValue}
          onChange={(e) => setCustomWidthValue(e.target.value)}
          onKeyDown={(e) => {
            console.log("Enter key pressed!", e.currentTarget.value);
            alert(`입력된 값: ${e.currentTarget.value}`);
          }}
          label="Enter를 눌러보세요"
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          4. Error 상태 (이메일 유효성 검사)
        </h3>
        <TextField
          id="email-1"
          name="email"
          type="text"
          value={emailValue}
          onChange={handleEmailChange}
          onRemoveClick={() => {
            setEmailValue("");
            setEmailError(false);
          }}
          isError={emailError}
          label="이메일을 입력하세요"
          supportingText={
            emailError ? "올바른 이메일 형식이 아닙니다." : "example@domain.com"
          }
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          5. Disabled 상태 (빈 값)
        </h3>
        <TextField
          id="disabled-empty-1"
          name="disabled-empty"
          type="text"
          value={disabledEmptyValue}
          onChange={(e) => setDisabledEmptyValue(e.target.value)}
          isDisabled
          label="비활성화된 필드"
        />
      </div>


      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          6. 아이콘 숨김
        </h3>
        <TextField
          id="no-icon-1"
          name="no-icon"
          type="text"
          value={noIconValue}
          onChange={(e) => setNoIconValue(e.target.value)}
          showIcon={false}
          label="텍스트를 입력하세요"
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          7. 커스텀 너비 (300px)
        </h3>
        <TextField
          id="custom-width-1"
          name="custom-width"
          type="text"
          value={customWidthValue}
          onChange={(e) => setCustomWidthValue(e.target.value)}
          width={300}
          label="텍스트를 입력하세요"
        />
      </div>

      <div>
        <h3
          style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "600" }}
        >
          8. 커스텀 Label 스타일
        </h3>
        <TextField
          id="custom-label-1"
          name="custom-label"
          type="text"
          value={customLabelValue}
          onChange={(e) => setCustomLabelValue(e.target.value)}
          label="빨간 라벨"
          labelStyle={{ color: "red" }}
        />
      </div>
    </div>
  );
}
