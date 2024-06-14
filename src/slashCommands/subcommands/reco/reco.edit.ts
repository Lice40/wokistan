import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import { RecoEditModal } from "../../../modals/recoEditModal";
import recommendations, {
  Recommendation,
} from "../../../schemas/recommendations";
import { AnswerHandler } from "../../../utils/answerHandler";

/**
 * Permer de modifier une recommendation
 * @param  interaction - l'intéraction en cours
 * @param  name - le nom de la recommendation
 *
 */
export async function editRecommendation(
  interaction: CommandInteraction,
  name: string
) {
  const oeuvre: Recommendation = await recommendations.findOne({ name: name });

  if (!oeuvre) {
    await new AnswerHandler(
      interaction,
      "L'oeuvre n'existe pas ",
      `L'oeuvre ${name} n'est pas encore enregistrée`,
      Colors.Red
    ).reply();
    return;
  }
  const modal = new RecoEditModal(interaction.user.id, name, oeuvre);
  await interaction.showModal(modal.getModal);

  interaction
    .awaitModalSubmit({ time: 50000 })
    .then(async (result) => {
      let warnings = result.fields.getTextInputValue("warnings").split(",");
      for (let i = 0; i < warnings.length; i++) {
        if (warnings[i].startsWith(" ")) {
          warnings[i] = warnings[i].substring(1, warnings[i].length);
        }
        warnings[i] = warnings[i].toLowerCase();
      }
      await new AnswerHandler(
        result,
        "Modification réussie",
        `L'oeuvre ${name} à été modifiée`,
        Colors.Green
      ).reply();
      await recommendations.findOneAndUpdate(
        { name: name },
        { warnings: warnings }
      );
    })
    .catch((err) => console.log(err));
}
