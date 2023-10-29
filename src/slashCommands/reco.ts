import {
  ChatInputCommandInteraction,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../types";
import { pronounInformations } from "./pronounCommands/pronounInfo";
import { pronounAdd } from "./pronounCommands/pronounAdd";
import { addReco } from "./recoCommands/addReco";
import { listRecommendations } from "./recoCommands/listReco";
import { deleteReco } from "./recoCommands/deleteReco";
import { editRecommendation } from "./recoCommands/editReco";
export const command: SlashCommand = {
  name: "reco",
  data: new SlashCommandBuilder()
    .setName("reco")
    .setDescription("permet de gérer les recommendations")
    .addSubcommand(
      (subcommand) =>
        subcommand
          .setName("add")
          .setDescription("ajoute une recommendation dans la liste")
      // .addStringOption((opt) =>
      //   opt
      //     .setName("name")
      //     .setDescription("Le nom de la recommendation")
      //     .setRequired(true)
      // )
      // .addStringOption((opt) =>
      //   opt
      //     .setName("type")
      //     .setDescription("le type de recommendation")
      //     .setRequired(true)
      // )
      // .addStringOption((opt) =>
      //   opt
      //     .setName("warnings")
      //     .setDescription("les trigger warnings éventuels")
      //     .setRequired(false)
      // )
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
    ),
  execute: async (interaction: CommandInteraction) => {
    const cmd = (
      interaction as ChatInputCommandInteraction
    ).options.getSubcommand();

    switch (cmd) {
      case "add":
        // let name = interaction.options
        //   .get("name")
        //   .value.toString()
        //   .toLowerCase();
        // let type = interaction.options
        //   .get("type")
        //   .value.toString()
        //   .toLowerCase();
        // let warnings = interaction.options.get("warnings").value.toString();
        await addReco(interaction);
        break;
      case "list":
        let opt = interaction.options.get("user");
        let user = opt ? opt.user : null;
        await listRecommendations(interaction, user);
        break;
      case "delete":
        let nom = interaction.options.get("nom").value.toString().toLowerCase();
        await deleteReco(interaction, nom.replace(/^./, nom[0].toUpperCase()));
        break;
      case "edit":
        let rName = interaction.options.get("nomreco").value.toString();
        await editRecommendation(
          interaction,
          rName.replace(/^./, rName[0].toUpperCase())
        );
        break;
    }
  },
};
