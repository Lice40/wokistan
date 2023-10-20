import { CommandInteraction, EmbedBuilder } from "discord.js";
import recommendations from "../../schemas/recommendations";

export async function deleteReco(
  interaction: CommandInteraction,
  name: string
) {
  let value = await recommendations.findOne({ name: name });

  if (!value) {
    await interaction.reply(`la recommendation ${name} n'existe pas`);
  } else {
    await recommendations.findOneAndDelete({ name: name });
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Supprimé")
          .setDescription(
            `**element**: \n > Nom: ${value.name}\n > Type: ${value.type} \n`
          )
          .setColor(2067276),
      ],
    });
  }
}
