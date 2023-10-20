import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Modal } from "./modals";

export class PronounEditModal extends Modal {
  url: string;
  pronoms: Array<string>;
  accords: Array<string>;
  constructor(id, data: any | null) {
    super(id, "edition des info");

    const pronomsInput = new TextInputBuilder()
      .setCustomId("pronouns")
      .setLabel("liste de pronoms")
      .setStyle(TextInputStyle.Paragraph);

    const accordsInput = new TextInputBuilder()
      .setCustomId("gendering")
      .setLabel("liste d'accords")
      .setStyle(TextInputStyle.Paragraph);

    const pageInput = new TextInputBuilder()
      .setCustomId("page")
      .setLabel("lien vers une page pronouns")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    if (data) {
      pronomsInput.setValue((data.pronouns as Array<string>).join(","));
      accordsInput.setValue((data.accords as Array<string>).join(","));
      pageInput.setValue(data.page ?? "");
    }

    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(pronomsInput);
    const secondActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(accordsInput);
    const thirdActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(pageInput);

    this.modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
  }
}
