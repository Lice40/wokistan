import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import { EmbedBuilder } from "@discordjs/builders";
export const command: SlashCommand = {
  name: "message",
  data: new SlashCommandBuilder()
    .setName("message")
    .setDescription("sends a msg")
    .addStringOption((option) => {
      return option
        .setName("message")
        .setDescription("message à afficher")
        .setRequired(true);
    }),
  execute: async (interaction) => {
    const message = interaction.options.get("message").value.toString();
    await interaction.reply({ content: `valeur du message: ${message}` });
  },
};
