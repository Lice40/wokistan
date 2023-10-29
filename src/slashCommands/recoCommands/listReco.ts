import {
  Colors,
  CommandInteraction,
  EmbedBuilder,
  GuildMember,
  User,
} from "discord.js";
import recommendations, { Recommendation } from "../../schemas/recommendations";

export async function listRecommendations(
  interaction: CommandInteraction,
  user: User
) {
  var list: Array<Recommendation>;
  var title = `liste des recommendations`;
  let member: GuildMember = await interaction.client.guilds.cache
    .get(interaction.guildId)
    .members.fetch({ user: interaction.user.id });
  var reponse = ``;
  if (user) {
    title = title + `de l'utilisateurice ${member.nickname}`;
    list = await recommendations.find({ user: user.id });
  } else {
    list = await recommendations.find();
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
