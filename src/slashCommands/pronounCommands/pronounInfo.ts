import {
  Colors,
  CommandInteraction,
  EmbedBuilder,
  Guild,
  GuildMember,
  User,
} from "discord.js";
import Pronouns from "../../schemas/pronounInfo";
import dailyPronouns from "../../schemas/dailyPronouns";

export async function pronounInformations(
  interaction: CommandInteraction,
  user: User
) {
  let member: GuildMember = await interaction.client.guilds.cache
    .get(interaction.guildId)
    .members.fetch({ user: user.id });
  let infos = await Pronouns.findOne({ userId: user.id });
  let daily = await dailyPronouns.findOne({ userId: user.id });
  if (!infos) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Aucune informations")
          .setDescription(
            `L'utilisateurice ${member.nickname} ne semble pas avoir enregistré d'informations pour l'instant`
          )
          .setColor(Colors.Red),
      ],
    });
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
          .setTitle(`informations de l'utilisateurice ${member.nickname}`)
          .setDescription(result)
          .setColor(Colors.Green),
      ],
    });
  }
}
