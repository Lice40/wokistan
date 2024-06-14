export {};

declare global {
  interface Array<T> {
    sample(): T;
    divide(parts_length: number): Array<Array<T>>;
  }
}
