import { Colors, CommandInteraction } from "discord.js";
import { PollSearchModal } from "../../../modals/pollSearchModal";
import { error } from "console";
import polls, { Poll } from "../../../schemas/polls.schema";
import { AnswerHandler } from "../../../utils/answerHandler";

export async function closePoll(interaction: CommandInteraction) {
  const modal = new PollSearchModal(interaction.user.id, "Quel sondage fermer");
  await modal.show(interaction);
  interaction
    .awaitModalSubmit({ time: 120000 })
    .then(async (result) => {
      let name: string = result.fields.getTextInputValue("nom");
      let pol: Poll = await polls.findOne({ name: name });
      if (!pol) {
        await new AnswerHandler(
          result,
          "Erreur!",
          `le sondage ${name} n'existe pas!`,
          Colors.Red
        ).reply(true);
        return;
      }
      if (pol.added_by !== interaction.user.id) {
        return await new AnswerHandler(
          result,
          "Vous n'êtes pas la créateurice du sondage!",
          null,
          Colors.Red
        ).reply(true);
      }

      if (pol.ended) {
        await new AnswerHandler(
          result,
          `Le sondage ${name} à déjà été fermé!`,
          null,
          Colors.Red
        ).reply(true);
        return;
      } else {
        console.log("ici");
        await polls.findOneAndUpdate({ name: name }, { ended: true });
        await new AnswerHandler(
          result,
          "Fini!",
          `le sondage ${name} est terminé! `,
          Colors.Green
        ).reply();
      }
    })
    .catch((error) => console.log(error));
}
