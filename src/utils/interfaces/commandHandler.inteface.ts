export interface CommandHandler {
  updateDb(): void | Promise<void>;
  init(): Promise<void>;
}
