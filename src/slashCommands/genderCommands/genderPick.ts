import {
  Colors,
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
} from "discord.js";
import { GenderPickerModal } from "../../modals/genderPickerModal";
import dailyPronouns from "../../schemas/dailyPronouns";
import pronounInfo from "../../schemas/pronounInfo";

export async function genderPick(interaction: CommandInteraction) {
  const datas = await pronounInfo.findOne({ userId: interaction.user.id });
  const modal = new GenderPickerModal(interaction.user.id, datas);
  let data = await dailyPronouns.findOne({ userId: interaction.user.id });
  let member: GuildMember = interaction.member as GuildMember;
  // member.setNickname("test");
  await interaction.showModal(modal.getModal);
  interaction
    .awaitModalSubmit({ time: 30000 })
    .then(async (result) => {
      const pronoms = result.fields.getTextInputValue("pronoms").split(",");
      const accords = result.fields.getTextInputValue("accords").split(",");
      let results: string = "résultats: \n";
      let pronom = pronoms.sample();
      let accord = accords.sample();
      if (data) {
        await dailyPronouns.findOneAndUpdate(
          { userId: interaction.user.id },
          { pronom: pronom, accord: accord }
        );
      } else {
        await dailyPronouns.create({
          userId: interaction.user.id,
          pronom: pronom,
          accord: accord,
        });
      }
      let line = `- pronom: ${pronom}, accords: ${accord} \n`;
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
    .catch((err) => console.log("cancelled"));
}
