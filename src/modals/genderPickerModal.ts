import { Modal } from "./modals";
import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export class GenderPickerModal extends Modal {
  constructor(id: string) {
    super(id, "paramètres");

    const limitInput = new TextInputBuilder()
      .setCustomId("limit")
      .setLabel("limite")
      .setValue("1")
      .setStyle(TextInputStyle.Short);

    const pronomsInput = new TextInputBuilder()
      .setCustomId("pronoms")
      .setLabel("liste de pronoms")
      .setValue("il,iel,elle,ael")
      .setStyle(TextInputStyle.Paragraph);

    const accordsInput = new TextInputBuilder()
      .setCustomId("accords")
      .setLabel("liste d'accords")
      .setValue("masc,fem,neutre,épicène")
      .setStyle(TextInputStyle.Paragraph);

    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(limitInput);
    const secondActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(pronomsInput);
    const thirdActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(accordsInput);

    this.modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
  }
}