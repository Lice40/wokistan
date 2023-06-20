import { SlashCommandBuilder, Message } from "discord.js";
import { SlashCommand } from "../types";
import { EmbedBuilder } from "@discordjs/builders";
export const command: SlashCommand = {
  name: "react",
  data: new SlashCommandBuilder()
    .setName("react")
    .setDescription("Sends a message with a reaction"),
  execute: async (interaction) => {
    const msg: Message = await interaction.reply({
      content: "Message avec réaction",
      fetchReply: true,
    });
    await msg.react("😄");
  },
};
