import { APIEmbedField } from "discord.js";

export function generateButtons(options: Array<string>): Array<APIEmbedField> {
  let answer: Array<APIEmbedField> = [];
  for (let i = 0; i < options.length; i++) {
    answer.push({ name: options[i], value: "0", inline: true });
  }
  return answer;
}
