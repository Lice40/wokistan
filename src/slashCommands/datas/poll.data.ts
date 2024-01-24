import { SlashCommandBuilder } from "discord.js";

export var datas = new SlashCommandBuilder()
  .setName("poll")
  .setDescription("génère un sondage")
  .setDMPermission(false)
  .addSubcommand((subcommand) =>
    subcommand.setName("start").setDescription("créé un sondage")
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("list").setDescription("liste les sondages en cours")
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("close").setDescription("termine un sondage")
  );
