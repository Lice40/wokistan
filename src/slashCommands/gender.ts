import {
  ChatInputCommandInteraction,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../types";
import { genderPick } from "./subcommands/gender/gender.module";
import { datas } from "./datas/gender.datas";
export const command: SlashCommand = {
  name: "gender",
  data: datas,
  execute: async (interaction: CommandInteraction) => {
    const cmd = (
      interaction as ChatInputCommandInteraction
    ).options.getSubcommand();
    switch (cmd) {
      case "pick":
        await genderPick(interaction);
        break;
    }
  },
};
