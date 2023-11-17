import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import recommendations, {
  Recommendation,
} from "../../../schemas/recommendations";

export async function recoInfo(interaction: CommandInteraction, name: string) {
  let reco: Recommendation;

  reco = await recommendations.findOne({ name: name });

  if (!reco) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("erreur")
          .setDescription(`La recommendation ${name} n'existe pas \n`)
          .setColor(Colors.Red),
      ],
    });
    return;
  }

  await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle(`informations de la recommendation ${reco.name}`)
        .setDescription(
          `> type: ${reco.type} \n > TW: ${
            reco.warnings.length > 0 || reco.warnings[0] == ""
              ? reco.warnings.join(" , ")
              : "aucun"
          } \n\n`
        )
        .setColor(Colors.Green),
    ],
  });
}
