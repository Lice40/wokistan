import {
  ActionRow,
  ActionRowBuilder,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import recommendations, {
  Recommendation,
} from "../../../schemas/recommendations";
import { AnswerHandler } from "../../../utils/answerHandler";

export async function recoInfo(interaction: CommandInteraction, name: string) {
  let reco: Recommendation;
  var answer: AnswerHandler = new AnswerHandler(interaction);
  /**Création d'un menu de test */

  reco = await recommendations.findOne({ name: name });

  if (!reco) {
    answer
      .setTitle("erreur")
      .setContent(`La recommendation ${name} n'existe pas \n`)
      .setColor(Colors.Red);
  } else {
    answer
      .setTitle(`informations de la recommendation ${reco.name}`)
      .setContent(
        `> type: ${reco.type} \n > TW: ${
          reco.warnings.length > 0 || reco.warnings[0] == ""
            ? reco.warnings.join(" , ")
            : "aucun"
        } \n\n`
      )
      .setColor(Colors.Green);
  }
  await answer.reply();
}
