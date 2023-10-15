export {};

declare global {
  interface Array<T> {
    sample(): T;
  }
}
