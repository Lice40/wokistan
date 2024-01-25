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
    const pollEmbed = interaction.message.embeds[0];
    if (!pollEmbed) return;
    const splittedArray = interaction.customId.split("-");

    if (splittedArray[0] !== "poll") return;
    let poll: Poll = await polls.findOne({ id: splittedArray[2] });

    if (!poll)
      return new AnswerHandler(
        interaction,
        "erreur!",
        "sondage introuvable",
        Colors.Red
      ).reply(true);

    if (poll.ended)
      return new AnswerHandler(
        interaction,
        "le sondage est terminé!",
        null,
        Colors.Red
      ).reply(true);

    let votedMembers: Set<string> = new Set<string>(poll.voters);
    let votes: Array<string> = poll.votes;

    //Gestion de l'annulation d'un vote
    if (splittedArray[1] === "cancel") {
      if (votedMembers.has(`${interaction.user.id}-${splittedArray[2]}`)) {
        let vote = votes
          .find((elt: string) => {
            return elt.startsWith(`${interaction.user.id}`);
          })
          .split("-")[1];

        let voted = pollEmbed.fields.find((elt) => {
          return elt.name === vote;
        });

        voted.value = String(parseInt(voted.value) - 1);
        votedMembers.delete(`${interaction.user.id}-${splittedArray[2]}`);
        votes.splice(vote.indexOf(`${interaction.user.id}-${vote}`), 1);

        await new AnswerHandler(
          interaction,
          "Annulé!",
          "le vote à été annulé",
          Colors.Green
        ).reply(true);
      } else {
        return new AnswerHandler(
          interaction,
          "Tu n'as pas  voté!",
          null,
          Colors.Red
        ).reply(true);
      }
      //gestion de l'ajout d'un vote
    } else {
      if (votedMembers.has(`${interaction.user.id}-${splittedArray[2]}`))
        return new AnswerHandler(
          interaction,
          "Fraudeureuse!",
          "vous avez déjà voté!",
          Colors.Red
        ).reply(true);

      votedMembers.add(`${interaction.user.id}-${splittedArray[2]}`);
      votes.push(`${interaction.user.id}-${splittedArray[1]}`);

      const field = pollEmbed.fields.find((elt) => {
        return elt.name === splittedArray[1];
      });

      field.value = String(parseInt(field.value) + 1);

      new AnswerHandler(
        interaction,
        "A voté!",
        "votre vote à été accepté",
        Colors.Green
      ).reply(true);
    }

    try {
      await polls.findOneAndUpdate(
        { id: splittedArray[2] },
        {
          voters: Array.from(votedMembers.values()),
          votes: votes,
        }
      );
      interaction.message.edit({ embeds: [pollEmbed] });
    } catch (error) {
      console.log(error);
    }
  },
};

export default event;
