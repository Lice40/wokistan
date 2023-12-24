import { SlashCommandBuilder } from "discord.js";

export var datas = new SlashCommandBuilder()
  .setName("reco")
  .setDescription("permet de gérer les recommendations")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("add")
      .setDescription("ajoute une recommendation dans la liste")
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("list")
      .setDescription("affiche la liste des recommendations")
      .addUserOption((opt) =>
        opt
          .setName("user")
          .setDescription("l'utilisateurice dont on veut les recommendations")
          .setRequired(false)
      )
      .addStringOption((opt) =>
        opt
          .setName("exclude")
          .setDescription("trigger warning to exclude")
          .setRequired(false)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("delete")
      .setDescription("supprime une recommendation de la liste")
      .addStringOption((opt) =>
        opt
          .setName("nom")
          .setDescription("le nom de la recommendation à supprimer")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("edit")
      .setDescription("permet dee modifier une recommendation")
      .addStringOption((opt) =>
        opt
          .setName("nomreco")
          .setDescription("l'oeuvre à modifier")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("info")
      .setDescription("obtient les infos sur une recommendation")
      .addStringOption((opt) =>
        opt
          .setName("reco")
          .setDescription("la recommendation")
          .setRequired(true)
      )
  );
