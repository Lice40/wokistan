import {
  Colors,
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  User,
} from "discord.js";
import recommendations, {
  Recommendation,
} from "../../../schemas/recommendations";

export async function listRecommendations(
  interaction: CommandInteraction,
  user: User,
  exclude: string
) {
  var list: Array<Recommendation>;
  var title = `liste des recommendations`;
  let member: GuildMember = await interaction.client.guilds.cache
    .get(interaction.guildId)
    .members.fetch({ user: user == null ? interaction.user.id : user.id });
  var reponse = ``;

  let listExclude = exclude ? exclude.split(",") : [];

  for (let i = 0; i < listExclude.length; i++) {
    if (listExclude[i].startsWith(" ")) {
      listExclude[i] = listExclude[i]
        .substring(1, listExclude[i].length)
        .toLowerCase();
    } else {
      listExclude[i] = listExclude[i].toLowerCase();
    }
  }
  if (user) {
    title = title + `de l'utilisateurice ${member.nickname}`;
    list = await recommendations.find({
      user: user.id,
      warnings: { $not: { $in: listExclude } },
    });
  } else {
    list = await recommendations.find({
      warnings: { $not: { $in: listExclude } },
    });
  }

  for (let i = 0; i < list.length; i++) {
    reponse = reponse + `> ${list[i].type} `;
    if (user) {
      reponse = reponse + `: ${list[i].name} \n`;
    } else {
      reponse = reponse + `ajouté par ${list[i].added_by} : ${list[i].name} \n`;
    }
    reponse =
      reponse +
      `> TW: ${
        list[i].warnings.length > 0 || list[i].warnings[0] == ""
          ? list[i].warnings.join(" , ")
          : "aucun"
      } \n\n`;
  }

  await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle(title)
        .setDescription(reponse)
        .setColor(Colors.Green),
    ],
  });
}
