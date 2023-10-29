import { Recommendation } from "../schemas/recommendations";
import { Modal } from "./modals";
import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export class RecoEditModal extends Modal {
  constructor(id: string, name: string, reco: Recommendation) {
    super(id, `Edition de la recommendation ${name}`);

    const warningInput = new TextInputBuilder()
      .setCustomId("warnings")
      .setLabel("Les trigger warnings de l'oeuvre")
      .setValue("")
      .setStyle(TextInputStyle.Paragraph);

    if (reco.warnings.length > 0) {
      warningInput.setValue(reco.warnings.join(","));
    }

    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(warningInput);

    this.modal.addComponents(firstActionRow);
  }
}
