import { CommandInteraction } from "discord.js";

export async function genderInfo(
  interaction: CommandInteraction,
  user: string
) {
  await interaction.reply(
    `vous avez demandé des informations sur l'utilisateurice ${user} \n`
  );
}
