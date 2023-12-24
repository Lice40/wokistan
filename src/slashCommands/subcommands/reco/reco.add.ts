import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import recommendations, {
  Recommendation,
} from "../../../schemas/recommendations";
import { AddRecoModal } from "../../../modals/addRecoModal";
import { AnswerHandler } from "../../../utils/answerHandler";

export async function addReco(interaction: CommandInteraction) {
  const modal = new AddRecoModal(interaction.user.id);
  await interaction.showModal(modal.getModal);
  var answer: AnswerHandler = new AnswerHandler(interaction, null, null, null);
  interaction
    .awaitModalSubmit({ time: 120000 })
    .then(async (result) => {
      let name = result.fields
        .getTextInputValue("name")
        .toString()
        .toLowerCase();
      let type = result.fields
        .getTextInputValue("type")
        .toString()
        .toLowerCase();
      let warnings: string[] = result.fields
        .getTextInputValue("warnings")
        .split(",");
      let data: Recommendation = await recommendations.findOne({
        name: name,
        type: type,
      });
      answer.setInteraction(result);
      if (data) {
        answer.setTitle("L'oeuvre existe déjà");
        answer.setContent(`L'oeuvre ${data.name} est déjà enregistrée`);
        answer.setColor(Colors.Red);
      } else {
        answer.setTitle("Modification réussie");
        answer.setContent(`L'oeuvre ${name} à été créée`);
        answer.setColor(Colors.Green);
        for (let i = 0; i < warnings.length; i++) {
          if (warnings[i].startsWith(" ")) {
            warnings[i] = warnings[i]
              .substring(1, warnings[i].length)
              .toLowerCase();
          }
          warnings[i] = warnings[i].toLowerCase();
        }
        await recommendations.create({
          added_by: interaction.user.username,
          user: interaction.user.id,
          type: type.replace(/^./, type[0].toUpperCase()),
          name: name.replace(/^./, name[0].toUpperCase()),
          warnings: warnings.length == 0 || warnings[0] == "" ? [] : warnings,
        });
      }
      await answer.reply();
    })
    .catch((err) => console.log(err));
}
