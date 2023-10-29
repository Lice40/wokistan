import { Recommendation } from "../schemas/recommendations";
import { Modal } from "./modals";
import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export class AddRecoModal extends Modal {
  constructor(id: string) {
    super(id, `Création d'une nouvelle recommendation `);

    const nameInput = new TextInputBuilder()
      .setCustomId("name")
      .setLabel("Nom de l'oeuvre")
      .setPlaceholder("nom")
      .setValue("")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const typeInput = new TextInputBuilder()
      .setCustomId("type")
      .setLabel("type")
      .setPlaceholder("ex: Animé")
      .setValue("")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const warningInput = new TextInputBuilder()
      .setCustomId("warnings")
      .setLabel("Les trigger warnings de l'oeuvre")
      .setValue("")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false);

    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput);

    const secondActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(typeInput);

    const thirdActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(warningInput);
    this.modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
  }
}
