import {
  Colors,
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  User,
} from "discord.js";

import { Modal } from "../../../modals/modals";
import { PronounEditModal } from "../../../modals/pronounEditModal";
import Pronouns from "../../../schemas/pronounInfo";

export async function pronounAdd(user: User, interaction: CommandInteraction) {
  let informations = await Pronouns.findOne({
    userId: user.id,
  });
  let member: GuildMember = await interaction.client.guilds.cache
    .get(interaction.guildId)
    .members.fetch({ user: interaction.user.id });
  let modal: Modal = new PronounEditModal(user.id, informations);
  await interaction.showModal(modal.getModal);

  interaction
    .awaitModalSubmit({ time: 360000 })
    .then(async (result) => {
      const pronoms = result.fields.getTextInputValue("pronouns").split(",");
      const accords = result.fields.getTextInputValue("gendering").split(",");
      const page = result.fields.getTextInputValue("page");
      if (informations) {
        await Pronouns.findOneAndUpdate(
          { userId: user.id },
          { pronouns: pronoms, accords: accords, page: page }
        );
      } else {
        await Pronouns.create({
          userId: user.id,
          pronouns: pronoms,
          accords: accords,
          page: page,
        });
      }
      await result.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("mise à jour réussie")
            .setDescription(
              `informations de l'utilisateurice ${
                member.nickname ? member.nickname : member.user.username
              } mises à jour`
            )
            .setColor(Colors.Green),
        ],
      });
    })
    .catch((err) => console.log(err));
}
