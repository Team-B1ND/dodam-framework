export const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const ITEM_HEIGHT = 44;
export const VISIBLE_COUNT = 5;
export const OFFSET = Math.floor(VISIBLE_COUNT / 2);

export const HOURS = Array.from({ length: 24 }, (_, i) => i);
export const MINUTES = Array.from({ length: 60 }, (_, i) => i);

export const REPEAT_COUNT = 3;
export const INFINITE_HOURS = Array(REPEAT_COUNT).fill(HOURS).flat();
export const INFINITE_MINUTES = Array(REPEAT_COUNT).fill(MINUTES).flat();