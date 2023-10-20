import { CommandInteraction, EmbedBuilder } from "discord.js";
import { GenderPickerModal } from "../../modals/genderPickerModal";

export async function genderPick(interaction: CommandInteraction) {
  const modal = new GenderPickerModal(interaction.user.id);
  await interaction.showModal(modal.getModal);
  interaction
    .awaitModalSubmit({ time: 30000 })
    .then(async (result) => {
      const pronoms = result.fields.getTextInputValue("pronoms").split(",");
      const accords = result.fields.getTextInputValue("accords").split(",");
      let results: string = "résultats: \n";
      let line = `- pronom: ${pronoms.sample()}, accords: ${accords.sample()} \n`;
      results = results.concat(line);
      await result.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Résultats")
            .setDescription(results)
            .setColor(15548997),
        ],
      });
    })
    .catch((err) => console.log("cancelled"));
}
