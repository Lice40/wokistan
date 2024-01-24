import {
  SlashCommandBuilder,
  CommandInteraction,
  Collection,
  ApplicationCommand,
  ChatInputCommandInteraction,
  Interaction,
  ButtonInteraction,
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
  // autocomplete?: (
  //   interaction: CommandInteraction | Interaction
  // ) => Promise<any>;
  execute: (
    interaction: CommandInteraction | Interaction | ButtonInteraction
  ) => Promise<void>;
}
export {};
