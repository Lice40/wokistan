import {
  SlashCommandBuilder,
  CommandInteraction,
  Collection,
} from "discord.js";

declare global {
  namespace NodeJs {
    interface ProcessEnv {
      CLIENT_ID: string;
      TOKEN: string;
      CHANNEL_ID: string;
      ROLE_ID: string;
    }
  }
}

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>;
  }
}
export interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args) => void;
}

export interface SlashCommand {
  name: string;
  data: SlashCommandBuilder | any;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
export {};
