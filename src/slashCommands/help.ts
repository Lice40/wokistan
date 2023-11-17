import {
  ChatInputCommandInteraction,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  ToAPIApplicationCommandOptions,
} from "discord.js";
import { SlashCommand } from "../types";
import { genderPick } from "./subcommands/gender/gender.module";
import fs, { readdirSync } from "fs";
import { join } from "path";
export const command: SlashCommand = {
  name: "help",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("affiche la liste des commandes"),
  execute: async (interaction: CommandInteraction) => {
    const commands = interaction.client.slashCommands;
    let commandes = [];
    let slashCommandsDir = join(__dirname, "../slashCommands");
    const commandDir = readdirSync(slashCommandsDir).filter((file) =>
      file.endsWith(".js")
    );

    for (const file of commandDir) {
      const command: SlashCommandBuilder =
        require(`${slashCommandsDir}/${file}`).command
          .data as SlashCommandBuilder;
      let line: string = `Commande: /${command.name} \n > ${command.description} \n`;
      commandes.push(line);

      //TODO: Parser les paramètres
      command.options.forEach((elt: ToAPIApplicationCommandOptions) => {
        console.log(elt.toJSON());
      });
    }

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Résultat")
          .setDescription(commandes.join("\n"))
          .setColor(Colors.Green),
      ],
    });
  },
};
