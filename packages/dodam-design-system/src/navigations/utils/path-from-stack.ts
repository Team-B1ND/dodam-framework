export const pathFromStack = (stack: string[]) => {
  return stack[stack.length - 1] ?? "/";
};
