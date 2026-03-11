export type StateStore = Record<string, unknown>;

export interface ContextType {
  register: (key: string, initialValue: unknown) => unknown;
  update: (key: string, value: unknown) => void;
}

export type Widen<T> =
  T extends boolean ? boolean :
  T extends number ? number :
  T extends string ? string :
  T;