import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import recommendations from "../../../schemas/recommendations";
import { AnswerHandler } from "../../../utils/answerHandler";

/**
 * gère la fonciton /reco delete <name>
 * @param interaction l'intéraction en cours
 * @param name le nom de la recommendation
 */
export async function deleteReco(
  interaction: CommandInteraction,
  name: string
) {
  var answer: AnswerHandler = new AnswerHandler(interaction, null, null, null);
  let value = await recommendations.findOne({ name: name });

  if (!value) {
    answer
      .setTitle("Erreur")
      .setContent(`La recomendation ${name} n'existe pas`)
      .setColor(Colors.Red);
  } else {
    await recommendations.findOneAndDelete({ name: name });
    answer
      .setTitle("Suprimé")
      .setContent(
        `**element**: \n > Nom: ${value.name}\n > Type: ${value.type} \n`
      )
      .setColor(Colors.Green);
  }
}
