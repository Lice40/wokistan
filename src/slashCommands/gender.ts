import {
  ChatInputCommandInteraction,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../types";
import { genderPick, genderInfo } from "./genderCommands/gender.module";
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
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("info")
        .setDescription("retourne des informations sur une personne")
        .addStringOption((opt) =>
          opt
            .setName("usr")
            .setDescription("the user you want informations")
            .setRequired(true)
        )
    ),
  execute: async (interaction: CommandInteraction) => {
    const cmd = (
      interaction as ChatInputCommandInteraction
    ).options.getSubcommand();

    // if (cmd == "pick") {
    //   console.log("pick");
    //   await genderPick(interaction);
    // }

    switch (cmd) {
      case "pick":
        await genderPick(interaction);
        break;
      case "info":
        if (interaction.options.get("usr")) {
          await genderInfo(
            interaction,
            interaction.options.get("usr").value.toString()
          );
        }
    }
  },
};
