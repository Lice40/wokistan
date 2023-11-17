import {
  ChatInputCommandInteraction,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../types";
import { pronounInformations } from "./subcommands/pronouns/pronouns.info";
import { pronounAdd } from "./subcommands/pronouns/pronouns.add";
import { addReco } from "./subcommands/reco/reco.add";
import { listRecommendations } from "./subcommands/reco/reco.list";
import { deleteReco } from "./subcommands/reco/reco.delete";
import { editRecommendation } from "./subcommands/reco/reco.edit";
import { recoInfo } from "./subcommands/reco/reco.info";
export const command: SlashCommand = {
  name: "reco",
  data: new SlashCommandBuilder()
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
    ),
  execute: async (interaction: CommandInteraction) => {
    const cmd = (
      interaction as ChatInputCommandInteraction
    ).options.getSubcommand();

    switch (cmd) {
      case "add":
        await addReco(interaction);
        break;
      case "list":
        let opt = interaction.options.get("user");
        let user = opt ? opt.user : null;
        let opt2 = interaction.options.get("exclude");
        let exclude = opt2 ? opt2.value.toString() : null;
        await listRecommendations(interaction, user, exclude);
        break;
      case "delete":
        let nom = interaction.options.get("nom").value.toString().toLowerCase();
        await deleteReco(interaction, nom.replace(/^./, nom[0].toUpperCase()));
        break;
      case "edit":
        let rName = interaction.options
          .get("nomreco")
          .value.toString()
          .toLowerCase();
        await editRecommendation(
          interaction,
          rName.replace(/^./, rName[0].toUpperCase())
        );
        break;
      case "info":
        let reco = interaction.options
          .get("reco")
          .value.toString()
          .toLowerCase();
        await recoInfo(interaction, reco.replace(/^./, reco[0].toUpperCase()));
        break;
    }
  },
};
