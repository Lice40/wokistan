import {
  SlashCommandBuilder,
  CommandInteraction,
  Collection,
  ApplicationCommand,
  ChatInputCommandInteraction,
  Interaction,
} from "discord.js";

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
  execute: (interaction: CommandInteraction | Interaction) => Promise<void>;
}
export {};
