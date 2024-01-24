import {
  APIEmbed,
  ButtonInteraction,
  CommandInteraction,
  EmbedBuilder,
  Interaction,
  JSONEncodable,
  ModalSubmitInteraction,
  escapeHeading,
} from "discord.js";

export class AnswerHandler {
  private _interaction:
    | ModalSubmitInteraction
    | CommandInteraction
    | ButtonInteraction;
  private _embed: EmbedBuilder[];
  constructor(
    interaction:
      | ModalSubmitInteraction
      | CommandInteraction
      | ButtonInteraction,
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

  async reply(ephemeral = false): Promise<void> {
    await this._interaction.reply({
      embeds: this._embed,
      ephemeral: ephemeral,
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
