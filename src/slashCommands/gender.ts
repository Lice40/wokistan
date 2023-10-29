import {
  ChatInputCommandInteraction,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../types";
import { genderPick } from "./subcommands/gender/gender.module";
export const command: SlashCommand = {
  name: "gender",
  data: new SlashCommandBuilder()
    .setName("gender")
    .setDescription("selectionne un ou plusieurs pronoms et accords")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("pick")
        .setDescription(
          "Sélectionne aléatoirement un pronom et un accord depuis une liste"
        )
    ),
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
