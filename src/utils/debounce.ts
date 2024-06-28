// eslint-disable-next-line
type FuncWithArgs = (...args: any) => void;
type FuncWithoutArgs = () => void;

export function debounce(func: FuncWithArgs | FuncWithoutArgs, ms: number = 500) {
  let timeout = 0;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), ms);
  };
}
