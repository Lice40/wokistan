import { CommandInteraction, ModalBuilder } from "discord.js";

export class Modal {
  modal: ModalBuilder;
  constructor(id: string, title) {
    this.modal = new ModalBuilder({
      custom_id: id,
      title: title,
    });
  }

  async show(interaction: CommandInteraction) {
    await interaction.showModal(this.modal);
  }
}
