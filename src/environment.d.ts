declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      TOKEN: string;
      CHANNEL_ID: string;
      ROLE_ID: string;
      GUILD_ID: string;
      MONGODB_STR: string;
      BOT_CHANNEL_ID: string;
    }
  }
}

export {};
