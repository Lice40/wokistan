import { Recommendation } from "../schemas/recommendations";
import { Modal } from "./modals";
import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export class PollModal extends Modal {
  constructor(id: string, name: string) {
    super(id, `Edition de la recommendation ${name}`);

    const nameInput = new TextInputBuilder()
      .setCustomId("question")
      .setLabel("Le but du sondage")
      .setValue("")
      .setPlaceholder("Hirondelle européenne ou africaine?")
      .setStyle(TextInputStyle.Short);

    const optionsInput = new TextInputBuilder()
      .setCustomId("options")
      .setLabel("les options possibles")
      .setValue("")
      .setPlaceholder("Africaine,Europénne")
      .setStyle(TextInputStyle.Short);

    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput);

    const secondActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(optionsInput);

    this.modal.addComponents(firstActionRow, secondActionRow);
  }
}
