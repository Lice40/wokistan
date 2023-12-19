import {
  Colors,
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
} from "discord.js";
import { GenderPickerModal } from "../../../modals/genderPickerModal";
import dailyPronouns from "../../../schemas/dailyPronouns";
import pronounInfo from "../../../schemas/pronounInfo";

export async function genderPick(interaction: CommandInteraction) {
  const datas = await pronounInfo.findOne({ userId: interaction.user.id });
  const modal = new GenderPickerModal(interaction.user.id, datas);
  let data = await dailyPronouns.findOne({ userId: interaction.user.id });
  let member: GuildMember = interaction.member as GuildMember;
  await interaction.showModal(modal.getModal);
  interaction
    .awaitModalSubmit({ time: 120000 })
    .then(async (result) => {
      const pronoms = result.fields
        .getTextInputValue("pronoms")
        .split(",")
        .filter((elt: string) => {
          return data.already_picked.indexOf(elt) === -1;
        });

      const accords = result.fields.getTextInputValue("accords").split(",");
      const pronounIterations: number = parseInt(
        result.fields.getTextInputValue("pronounIter")
      );

      const accordsIterations: number = parseInt(
        result.fields.getTextInputValue("accordIter")
      );
      let pronomsResult: Array<string> = data.pronom;
      let accordsResult: Array<string> = data.accord;

      let results: string = "";
      let i = 0;
      if (pronounIterations > 0) {
        pronomsResult = [];
        while (pronoms.length > 0 && i < pronounIterations) {
          let temp = pronoms.sample();
          pronomsResult.push(temp);

          pronoms.splice(pronoms.indexOf(temp), 1);
          i = i + 1;
        }
      }

      let j = 0;
      if (accordsIterations > 0) {
        accordsResult = [];
        while (accords.length > 0 && j < accordsIterations) {
          let tmp = accords.sample();
          accordsResult.push(tmp);
          accords.splice(accords.indexOf(tmp), 1);
          j = j + 1;
        }
      }

      if (data) {
        await dailyPronouns.findOneAndUpdate(
          { userId: interaction.user.id },
          {
            pronom: [...new Set(pronomsResult)],
            accord: [...new Set(accordsResult)],
            already_picked: [...new Set(pronomsResult)],
          }
        );
      } else {
        await dailyPronouns.create({
          userId: interaction.user.id,
          pronom: [...new Set(pronomsResult)],
          accord: [...new Set(accordsResult)],
          already_picked: [...new Set(pronomsResult)],
        });
      }

      let line = `> **pronom:** ${[...new Set(pronomsResult)].join(
        " , "
      )} \n  > **accords:** ${[...new Set(accordsResult)].join(" , ")} \n`;
      results = results.concat(line);
      await result.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Résultats")
            .setDescription(results)
            .setColor(Colors.Green),
        ],
      });
    })
    .catch((err) => console.log(err));
}
