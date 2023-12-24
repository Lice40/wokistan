import { SlashCommandBuilder } from "discord.js";

export var datas = new SlashCommandBuilder()
  .setName("pronouns")
  .setDescription("selectionne un ou plusieurs pronoms et accords")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("info")
      .setDescription("retourne des informations sur une personne")
      .addUserOption((opt) =>
        opt
          .setName("user")
          .setDescription("the user you want informations")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("add").setDescription("ajoute des informations")
  );
