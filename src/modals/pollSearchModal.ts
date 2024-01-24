import { Recommendation } from "../schemas/recommendations";
import { Modal } from "./modals";
import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export class PollSearchModal extends Modal {
  constructor(id: string, name: string) {
    super(id, `Edition de la recommendation ${name}`);

    const nameInput = new TextInputBuilder()
      .setCustomId("nom")
      .setLabel("nom du sondage")
      .setValue("")
      .setPlaceholder("Hirondelle européenne ou africaine?")
      .setStyle(TextInputStyle.Short);

    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput);

    this.modal.addComponents(firstActionRow);
  }
}
