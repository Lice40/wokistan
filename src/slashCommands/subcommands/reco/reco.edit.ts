import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import { RecoEditModal } from "../../../modals/recoEditModal";
import recommendations, {
  Recommendation,
} from "../../../schemas/recommendations";

export async function editRecommendation(
  interaction: CommandInteraction,
  name: string
) {
  const oeuvre: Recommendation = await recommendations.findOne({ name: name });

  if (!oeuvre) {
    console.log("je suis la");
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("L'oeuvre n'existe pas ")
          .setDescription(`L'oeuvre ${name} n'est pas encore enregistrée`)
          .setColor(Colors.Red),
      ],
    });
    return;
  }
  const modal = new RecoEditModal(interaction.user.id, name, oeuvre);
  await interaction.showModal(modal.getModal);

  interaction
    .awaitModalSubmit({ time: 50000 })
    .then(async (result) => {
      let warnings = result.fields.getTextInputValue("warnings").split(",");

      await result.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Modification réussie")
            .setDescription(`L'oeuvre ${name} à été modifiée`)
            .setColor(Colors.Green),
        ],
      });
      await recommendations.findOneAndUpdate(
        { name: name },
        { warnings: warnings }
      );
    })
    .catch((err) => console.log(err));
}
