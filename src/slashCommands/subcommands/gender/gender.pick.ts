import {
  Colors,
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
} from "discord.js";
import { GenderPickerModal } from "../../../modals/genderPickerModal";
import dailyPronouns from "../../../schemas/dailyPronouns";
import pronounInfo from "../../../schemas/pronounInfo";
import { GenderPicker } from "./genderPicker";
import { AnswerHandler } from "../../../utils/answerHandler";

export async function genderPick(interaction: CommandInteraction) {
  var genderPicker: GenderPicker = await new GenderPicker(interaction.user.id);
  let valid = await genderPicker.init();

  if (!valid) {
    return new AnswerHandler(
      interaction,
      "Echec",
      "vous n'avez pas encore créé votre profil. Veuillez le créer avec la commande /pronouns add et recommencer",
      Colors.Red
    ).reply(true);
  }
  const modal = new GenderPickerModal(
    interaction.user.id,
    genderPicker.pronounInfos
  );

  let member: GuildMember = interaction.member as GuildMember;
  await interaction.showModal(modal.getModal);
  interaction
    .awaitModalSubmit({ time: 120000 })
    .then(async (result) => {
      let pronomsResult: Array<string> = genderPicker.generatePronouns(
        result.fields.getTextInputValue("pronoms").split(","),
        parseInt(result.fields.getTextInputValue("pronounIter"))
      );
      let accordsResult: Array<string> = genderPicker.generateAccords(
        result.fields.getTextInputValue("accords").split(","),
        parseInt(result.fields.getTextInputValue("accordIter"))
      );

      let results: string = "";
      let line = `> **pronoms:** ${[...new Set(pronomsResult)].join(
        " , "
      )} \n  > **accords:** ${[...new Set(accordsResult)].join(" , ")} \n`;
      results = results.concat(line);
      await genderPicker.updateDb();
      await new AnswerHandler(
        result,
        "Résultats",
        results,
        Colors.Green
      ).reply();
    })
    .catch((err) => console.log(err));
}
