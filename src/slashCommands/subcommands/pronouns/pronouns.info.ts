import {
  Colors,
  CommandInteraction,
  EmbedBuilder,
  Guild,
  GuildMember,
  User,
} from "discord.js";
import Pronouns from "../../../schemas/pronounInfo";
import dailyPronouns from "../../../schemas/dailyPronouns";
import { AnswerHandler } from "../../../utils/answerHandler";

export async function pronounInformations(
  interaction: CommandInteraction,
  user: User
) {
  let answer: AnswerHandler = new AnswerHandler(interaction);
  let member: GuildMember = await interaction.client.guilds.cache
    .get(interaction.guildId)
    .members.fetch({ user: user.id });
  let infos = await Pronouns.findOne({ userId: user.id });
  let daily = await dailyPronouns.findOne({ userId: user.id });
  if (!infos) {
    answer
      .setTitle("Aucune informations")
      .setContent(
        `L'utilisateurice ${member.nickname} ne semble pas avoir enregistré d'informations pour l'instant`
      )
      .setColor(Colors.Red);
  } else {
    answer
      .setTitle(
        `informations de l'utilisateurice ${
          member.nickname ? member.nickname : member.user.username
        }`
      )
      .setColor(Colors.Green);
    let content = `**informations générales:** \n > pronoms: ${(
      infos.pronouns as Array<string>
    ).join(",")} \n > accords: ${(infos.accords as Array<string>).join(
      ","
    )}\n > page: ${infos.page == "" ? "aucune" : infos.page} `;

    if (daily) {
      content =
        content +
        `\n\n **pronoms du jour:** \n > pronom: ${daily.pronom.join(
          " , "
        )} \n > accord: ${daily.accord.join(" , ")}`;
    }
    answer.setContent(content);
  }

  await answer.reply();
}
