import { CommandInteraction, EmbedBuilder, User } from "discord.js";
import Pronouns from "../../schemas/pronounInfo";
import dailyPronouns from "../../schemas/dailyPronouns";

export async function pronounInformations(
  interaction: CommandInteraction,
  user: User
) {
  console.log("je suis dans la fonction");

  let infos = await Pronouns.findOne({ userId: user.id });
  let daily = await dailyPronouns.findOne({ userId: user.id });
  if (!infos) {
    await interaction.reply(`aucune info sur l'utilisateurice ${user}`);
  } else {
    let result = `**informations générales:** \n > pronoms: ${(
      infos.pronouns as Array<string>
    ).join(",")} \n > accords: ${(infos.accords as Array<string>).join(
      ","
    )}\n > page: ${infos.page == "" ? "aucune" : infos.page} `;

    if (daily) {
      result =
        result +
        `\n\n **pronoms du jour:** \n > pronom: ${daily.pronom} \n > accord: ${daily.accord}`;
    }
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`informations de l'utilisateurice ${user.username}`)
          .setDescription(result)
          .setColor(15548997),
      ],
    });
  }
}
