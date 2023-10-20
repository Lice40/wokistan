import { CommandInteraction, EmbedBuilder, User } from "discord.js";
import recommendations from "../../schemas/recommendations";

export async function listRecommendations(
  interaction: CommandInteraction,
  user: User
) {
  var list: Array<any>;
  var title = `liste des recommendations`;
  var reponse = ``;
  if (user) {
    title = title + `de l'utilisateurice ${user.username}`;
    list = await recommendations.find({ user: user.id });
  } else {
    list = await recommendations.find();
  }

  for (let i = 0; i < list.length; i++) {
    reponse = reponse + `> ${list[i].type}`;
    if (user) {
      reponse = reponse + `: ${list[i].name} \n`;
    } else {
      reponse = reponse + `ajouté par ${list[i].added_by} : ${list[i].name} \n`;
    }
  }

  await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle(title)
        .setDescription(reponse)
        .setColor(2067276),
    ],
  });
}
