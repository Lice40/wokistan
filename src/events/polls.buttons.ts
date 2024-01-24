import { BotEvent } from "../types";
import {
  Interaction,
  Events,
  ButtonInteraction,
  Colors,
  APIActionRowComponent,
  APIMessageActionRowComponent,
} from "discord.js";
import { AnswerHandler } from "../utils/answerHandler";
import polls, { Poll } from "../schemas/polls.schema";

const event: BotEvent = {
  name: Events.InteractionCreate,
  async execute(interaction: ButtonInteraction) {
    if (!interaction.isButton()) {
      return;
    }

    const splittedArray = interaction.customId.split("-");
    if (splittedArray[0] !== "poll") return;
    let poll: Poll = await polls.findOne({ id: splittedArray[2] });
    if (poll.ended)
      return new AnswerHandler(
        interaction,
        "le sondage est terminé!",
        null,
        Colors.Red
      ).reply(true);

    if (!poll)
      return new AnswerHandler(
        interaction,
        "erreur!",
        "sondage introuvable",
        Colors.Red
      ).reply(true);
    let votedMembers: Set<string> = new Set<string>(poll.voters);

    if (votedMembers.has(`${interaction.user.id}-${splittedArray[2]}`))
      return new AnswerHandler(
        interaction,
        "Fraudeureuse!",
        "vous avez déjà voté!",
        Colors.Red
      ).reply(true);

    votedMembers.add(`${interaction.user.id}-${splittedArray[2]}`);

    const pollEmbed = interaction.message.embeds[0];
    if (!pollEmbed) return;

    const field = pollEmbed.fields.find((elt) => {
      return elt.name === splittedArray[1];
    });

    field.value = String(parseInt(field.value) + 1);
    interaction.message.edit({ embeds: [pollEmbed] });
    new AnswerHandler(
      interaction,
      "A voté!",
      "votre vote à été accepté",
      Colors.Green
    ).reply(true);
    try {
      await polls.findOneAndUpdate(
        { id: splittedArray[2] },
        { voters: Array.from(votedMembers.values()) }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default event;
