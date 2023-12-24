import {
  ChatInputCommandInteraction,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { datas } from "./datas/pronouns.data";
import { SlashCommand } from "../types";
import { pronounInformations } from "./subcommands/pronouns/pronouns.info";
import { pronounAdd } from "./subcommands/pronouns/pronouns.add";

export const command: SlashCommand = {
  name: "pronouns",
  data: datas,
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
