import { CommandInteraction, User } from "discord.js";

import { Modal } from "../../../modals/modals";
import { PronounEditModal } from "../../../modals/pronounEditModal";
import Pronouns from "../../../schemas/pronounInfo";

export async function pronounAdd(user: User, interaction: CommandInteraction) {
  let informations = await Pronouns.findOne({
    userId: user.id,
  });
  let modal: Modal = new PronounEditModal(user.id, informations);
  await interaction.showModal(modal.getModal);

  interaction
    .awaitModalSubmit({ time: 60000 })
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
      await result.reply(`données de l'uilisateurice ${user} mises à jour`);
    })
    .catch((err) => console.log("cancelled"));
}
