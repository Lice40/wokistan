import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import { EmbedBuilder } from "@discordjs/builders";
export const command: SlashCommand = {
  name: "ping",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Affiche le ping du bot"),
  execute: async (interaction) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: "Iris" })
          .setDescription(`Pong!\nPing:${interaction.client.ws.ping}`)
          .setColor(15548997),
      ],
    });
  },
};
