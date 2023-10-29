import {
  ChatInputCommandInteraction,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../types";
import { pronounInformations } from "./subcommands/pronouns/pronoun.info";
import { pronounAdd } from "./subcommands/pronouns/pronouns.add";
export const command: SlashCommand = {
  name: "pronouns",
  data: new SlashCommandBuilder()
    .setName("pronouns")
    .setDescription("selectionne un ou plusieurs pronoms et accords")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("info")
        .setDescription("retourne des informations sur une personne")
        .addUserOption((opt) =>
          opt
            .setName("user")
            .setDescription("the user you want informations")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("add").setDescription("ajoute des informations")
    ),
  execute: async (interaction: CommandInteraction) => {
    const cmd = (
      interaction as ChatInputCommandInteraction
    ).options.getSubcommand();

    switch (cmd) {
      case "info":
        if (interaction.options.get("user")) {
          await pronounInformations(
            interaction,
            interaction.options.get("user").user
          );
        } else {
          await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("Erreur")
                .setDescription(`utilisateurice introuvable`)
                .setColor(Colors.Red),
            ],
          });
        }
        break;
      case "add":
        await pronounAdd(interaction.user, interaction);
        break;
    }
  },
};
