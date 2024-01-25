import {
  APIActionRowComponent,
  APIMessageActionRowComponent,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  Interaction,
} from "discord.js";
import { PollModal } from "../../../modals/pollModal";
import { AnswerHandler } from "../../../utils/answerHandler";
import { generateButtons } from "./poll.utils";
import polls from "../../../schemas/polls.schema";

export async function createPoll(interaction: CommandInteraction) {
  const modal = new PollModal(interaction.user.id, "Créé ton Sondage");
  await modal.show(interaction);
  interaction
    .awaitModalSubmit({ time: 120000 })
    .then(async (result) => {
      let question: string = result.fields.getTextInputValue("question");
      let options: Array<string> = result.fields
        .getTextInputValue("options")
        .split(",");

      if (options.length < 2) {
        await new AnswerHandler(
          result,
          "Erreur!",
          "Un sondage doit à voir au moins deux réponses possibles, baka!",
          Colors.Red
        ).reply();
        return;
      }

      const pollEmbed = new EmbedBuilder()
        .setDescription("**Question** \n" + question)
        .setImage(null)
        .addFields(generateButtons(options))
        .setColor([104, 204, 156]);

      const replyObject = await result.reply({
        embeds: [pollEmbed],
        fetchReply: true,
      });
      let buttons: Array<ButtonBuilder> = [];
      console.log(options);
      for (let i = 0; i < options.length; i++) {
        buttons.push(
          new ButtonBuilder()
            .setLabel(options[i])
            .setCustomId(`poll-${options[i]}-${replyObject.id}`)
            .setStyle((i + 1) % 5)
        );
      }
      buttons.push(
        new ButtonBuilder()
          .setLabel("annuler")
          .setCustomId(`poll-cancel-${replyObject.id}`)
          .setStyle(ButtonStyle.Danger)
      );
      const pollButtons = new ActionRowBuilder().addComponents(buttons);

      result.editReply({
        components: [
          pollButtons as unknown as APIActionRowComponent<APIMessageActionRowComponent>,
        ],
      });

      await polls.create({
        id: replyObject.id,
        name: question,
        voters: [],
        added_by: interaction.user.id,
        votes: [],
        ended: false,
      });
    })

    .catch((err) => console.log(err));
}
