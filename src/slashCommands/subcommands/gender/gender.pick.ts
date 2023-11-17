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
  // member.setNickname("test");
  await interaction.showModal(modal.getModal);
  interaction
    .awaitModalSubmit({ time: 120000 })
    .then(async (result) => {
      const pronoms = result.fields.getTextInputValue("pronoms").split(",");
      const accords = result.fields.getTextInputValue("accords").split(",");
      const iterations: number = parseInt(
        result.fields.getTextInputValue("iter")
      );
      let pronomsResult: Array<string> = [];
      let accordsResult: Array<string> = [];

      let results: string = "";
      let i = 0;
      while (pronoms.length > 0 && i < iterations) {
        let temp = pronoms.sample();
        pronomsResult.push(temp);
        accordsResult.push(accords.sample());

        pronoms.splice(pronoms.indexOf(temp), 1);
        i = i + 1;
      }

      if (data) {
        await dailyPronouns.findOneAndUpdate(
          { userId: interaction.user.id },
          {
            pronom: [...new Set(pronomsResult)],
            accord: [...new Set(accordsResult)],
          }
        );
      } else {
        await dailyPronouns.create({
          userId: interaction.user.id,
          pronom: [...new Set(pronomsResult)],
          accord: [...new Set(accordsResult)],
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
