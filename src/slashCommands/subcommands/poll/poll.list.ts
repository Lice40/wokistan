import {
  Colors,
  CommandInteraction,
  GuildMember,
  Interaction,
} from "discord.js";
import polls, { Poll } from "../../../schemas/polls.schema";
import { AnswerHandler } from "../../../utils/answerHandler";
export async function listPols(interaction: CommandInteraction) {
  let pollsList: Array<Poll> = await polls.find({ ended: false });

  if (pollsList.length == 0) {
    new AnswerHandler(
      interaction,
      "aucun sondage en cours",
      null,
      Colors.Red
    ).reply();
  } else {
    let answer: string = ``;
    pollsList.forEach(async (elt: Poll) => {
      answer = answer + `> nom: ${elt.name} \n\n`;
    });

    new AnswerHandler(
      interaction,
      "Liste des sondages",
      answer,
      Colors.Green
    ).reply();
  }
}
