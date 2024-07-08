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
import { Constants } from "../../../constants";

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

  let user: GuildMember = interaction.member as GuildMember;
  let member: GuildMember = await interaction.client.guilds.cache
    .get(interaction.guildId)
    .members.fetch({ user: user == null ? interaction.user.id : user.id });
  await interaction.showModal(modal.getModal);
  interaction
    .awaitModalSubmit({ time: 120000 })
    .then(async (result) => {
      let pronomsResult: Array<string> = genderPicker.generatePronouns(
        result.fields
          .getTextInputValue("pronoms")
          .split(Constants.ARRAY_SEPARATOR),
        parseInt(result.fields.getTextInputValue("pronounIter"))
      );
      let accordsResult: Array<string> = genderPicker.generateAccords(
        result.fields
          .getTextInputValue("accords")
          .split(Constants.ARRAY_SEPARATOR),
        parseInt(result.fields.getTextInputValue("accordIter"))
      );

      await genderPicker.updateDb();
      await new AnswerHandler(
        result,
        `Résultats du tirage de l'utilisateurice ${member.nickname}`,
        null,
        Colors.Green
      )
        .setFields(
          {
            name: `**pronoms**:`,
            value: `> ${pronomsResult
              .divide(4)
              .join("\n> ")
              .split(Constants.ARRAY_SEPARATOR)
              .join(Constants.STRING_SEPARATOR)}`,
          },
          {
            name: `**Accords**:`,
            value: `> ${accordsResult
              .divide(4)
              .join("\n> ")
              .split(Constants.ARRAY_SEPARATOR)
              .join(Constants.STRING_SEPARATOR)}`,
          }
        )
        .reply();
    })
    .catch((err) => console.log(err));
}
