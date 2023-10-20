import { CommandInteraction, EmbedBuilder } from "discord.js";
import recommendations from "../../schemas/recommendations";

export async function addReco(
  interaction: CommandInteraction,
  name: string,
  type: string
) {
  let data = await recommendations.findOne({ name: name, type: type });

  if (data) {
    await interaction.reply(
      "cette recommendation est déjà présente dans la liste"
    );
  }

  await recommendations.create({
    added_by: interaction.user.username,
    name: name,
    type: type,
    user: interaction.user.id,
  });

  await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("Ajouté")
        .setDescription(`**informations**:\n > Nom: ${name}\n > Type: ${type}`)
        .setColor(2067276),
    ],
  });
}
