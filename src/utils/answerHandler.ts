import {
  APIEmbed,
  CommandInteraction,
  EmbedBuilder,
  Interaction,
  JSONEncodable,
  ModalSubmitInteraction,
} from "discord.js";

export class AnswerHandler {
  private _interaction: ModalSubmitInteraction | CommandInteraction;
  private _embed: EmbedBuilder[];
  constructor(
    interaction: ModalSubmitInteraction | CommandInteraction,
    title: string = "N/A",
    content: string = "N/A",
    color: number = 0
  ) {
    this._interaction = interaction;

    this._embed = [
      new EmbedBuilder()
        .setTitle(title)
        .setDescription(content)
        .setColor(color),
    ];
  }

  async reply(): Promise<void> {
    await this._interaction.reply({
      embeds: this._embed,
    });
  }

  public setTitle(title: string) {
    this._embed[0].setTitle(title);
    return this as AnswerHandler;
  }

  public setColor(color: number) {
    this._embed[0].setColor(color);
    return this as AnswerHandler;
  }

  public setContent(content: string) {
    this._embed[0].setDescription(content);
    return this as AnswerHandler;
  }

  public setInteraction(
    interaction: ModalSubmitInteraction | CommandInteraction
  ) {
    this._interaction = interaction;
    return this as AnswerHandler;
  }
}
