import {
  APIActionRowComponent,
  APIMessageActionRowComponent,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../types";
import { genderPick } from "./subcommands/gender/gender.module";
import { datas } from "./datas/poll.data";
import { PollModal } from "../modals/pollModal";
import { AnswerHandler } from "../utils/answerHandler";
import { generateButtons } from "./subcommands/poll/poll.utils";
import { createPoll } from "./subcommands/poll/poll.create";
import { listPols } from "./subcommands/poll/poll.list";
import { closePoll } from "./subcommands/poll/poll.close";
export const command: SlashCommand = {
  name: "poll",
  data: datas,
  execute: async (interaction: CommandInteraction) => {
    const cmd = (
      interaction as ChatInputCommandInteraction
    ).options.getSubcommand();

    switch (cmd) {
      case "start":
        await createPoll(interaction);
        break;
      case "list":
        await listPols(interaction);
        break;
      case "close":
        await closePoll(interaction);
        break;
    }
  },
};
