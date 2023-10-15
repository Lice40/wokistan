import {
  ActionRowBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { SlashCommand } from "../types";
import { EmbedBuilder } from "@discordjs/builders";
import { GenderPickerModal } from "../modals/genderPickerModal";
export const command: SlashCommand = {
  name: "gender",
  data: new SlashCommandBuilder()
    .setName("gender")
    .setDescription("selectionne un ou plusieurs pronoms et accords"),
  execute: async (interaction) => {
    const modal = new GenderPickerModal(interaction.user.id);
    await modal.show(interaction);

    interaction.awaitModalSubmit({ time: 30000 }).then((result) => {
      const limit = result.fields.getTextInputValue(
        "limit"
      ) as unknown as number;
      const pronoms = result.fields.getTextInputValue("pronoms").split(",");
      const accords = result.fields.getTextInputValue("accords").split(",");
      let results: string = "résultats: \n";
      for (let i = 0; i < limit; i++) {
        let line = `- pronom: ${pronoms.sample()}, accords: ${accords.sample()} \n`;
        results = results.concat(line);
      }
      result.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Résultats")
            .setDescription(results)
            .setColor(15548997),
        ],
      });
    });
  },
};
