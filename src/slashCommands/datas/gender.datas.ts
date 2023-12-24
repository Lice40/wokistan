import { SlashCommandBuilder } from "discord.js";

export var datas = new SlashCommandBuilder()
  .setName("gender")
  .setDescription("selectionne un ou plusieurs pronoms et accords")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("pick")
      .setDescription(
        "Sélectionne aléatoirement un pronom et un accord depuis une liste"
      )
  );
