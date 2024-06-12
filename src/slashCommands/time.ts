import {
  ChatInputCommandInteraction,
  Colors,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../types";
import { genderPick } from "./subcommands/gender/gender.module";
import { datas } from "./datas/time.datas";
import { AnswerHandler } from "../utils/answerHandler";
import { resourceLimits } from "worker_threads";
export const command: SlashCommand = {
  name: "time",
  data: datas,
  execute: async (interaction: CommandInteraction) => {
    const letters: string[] = [
      "Z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
    ];
    const now = new Date(Date.now());
    let minutes = now.getMinutes().toString();
    let hours = now.getHours().toString();
    console.log(minutes.length);
    console.log(hours);
    if (minutes.length == 1) {
      minutes = "0".concat(minutes.toString());
    }
    console.log(minutes.length);
    if (hours.length == 1) {
      hours = "0".concat(hours.toString());
    }

    let result: string =
      letters[hours[0]] +
      letters[hours[1]] +
      letters[minutes[0]] +
      letters[minutes[1]];
    console.log(result);
    await new AnswerHandler(
      interaction,
      result == "ACAB" ? "ACAAAAAAAB" : "Heure",
      `il est ${result}`,
      Colors.Green
    ).reply();
  },
};
