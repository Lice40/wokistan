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
import { datas } from "./datas/recos.datas";
export const command: SlashCommand = {
  name: "reco",
  data: datas,
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
