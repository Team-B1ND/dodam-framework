"use client";

import {
  DatePicker,
  TimePicker,
  PickerTrigger,
  useOverlay,
  FilledButton,
  getCurrentTime,
  type Time,
} from "dodam-design-system/components";
import { useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

// DatePicker with useOverlay (Overlay mode)
export const TestDatePickerOverlay = () => {
  const overlay = useOverlay();
  const [date, setDate] = useState(new Date());

  const formatDate = (d: Date) =>
    `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

  const openDatePicker = () => {
    overlay.open(({ isOpen, close, exit, setDimClickHandler }) => (
      <DatePicker
        open={isOpen}
        date={date}
        onChangeDate={setDate}
        onClose={close}
        onExited={exit}
        setDimClickHandler={setDimClickHandler}
      />
    ));
  };

  return (
    <FilledButton onClick={openDatePicker}>{formatDate(date)}</FilledButton>
  );
};

// DatePicker with PickerTrigger (Popup mode)
export const TestDatePickerPopup = () => {
  const [date, setDate] = useState(new Date());

  const formatDate = (d: Date) =>
    `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

  return (
    <PickerTrigger
      content={({ onClose }) => (
        <DatePicker.Content
          date={date}
          onChangeDate={setDate}
          onClose={onClose}
        />
      )}
    >
      <FilledButton>{formatDate(date)}</FilledButton>
    </PickerTrigger>
  );
};

// DatePicker with disablePast (Overlay mode)
export const TestDatePickerDisablePast = () => {
  const overlay = useOverlay();
  const [date, setDate] = useState(new Date());

  const formatDate = (d: Date) =>
    `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

  const openDatePicker = () => {
    overlay.open(({ isOpen, close, exit, setDimClickHandler }) => (
      <DatePicker
        open={isOpen}
        date={date}
        onChangeDate={setDate}
        onClose={close}
        onExited={exit}
        setDimClickHandler={setDimClickHandler}
        disablePast
      />
    ));
  };

  return (
    <FilledButton onClick={openDatePicker}>{formatDate(date)}</FilledButton>
  );
};

// TimePicker with useOverlay (Overlay mode)
export const TestTimePickerOverlay = () => {
  const overlay = useOverlay();
  const [time, setTime] = useState<Time>(getCurrentTime());

  const openTimePicker = () => {
    overlay.open(({ isOpen, close, exit, setDimClickHandler }) => (
      <TimePicker
        open={isOpen}
        time={time}
        onChangeTime={setTime}
        onClose={close}
        onExited={exit}
        setDimClickHandler={setDimClickHandler}
      />
    ));
  };

  return (
    <FilledButton onClick={openTimePicker}>
      {pad(time.hour)}:{pad(time.minute)}
    </FilledButton>
  );
};

// TimePicker with PickerTrigger (Popup mode)
export const TestTimePickerPopup = () => {
  const [time, setTime] = useState<Time>(getCurrentTime());

  return (
    <PickerTrigger
      content={({ onClose }) => (
        <TimePicker.Content
          time={time}
          onChangeTime={setTime}
          onClose={onClose}
        />
      )}
    >
      <FilledButton>
        {pad(time.hour)}:{pad(time.minute)}
      </FilledButton>
    </PickerTrigger>
  );
};
