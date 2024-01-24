import { CommandInteraction, ModalBuilder } from "discord.js";

export class Modal {
  modal: ModalBuilder;
  id: string;
  constructor(id: string, title: string) {
    this.id = `gender-${id}`;
    this.modal = new ModalBuilder({
      custom_id: id,
      title: title.length > 45 ? title.slice(0, 41) + " ..." : title,
    });
  }

  async show(interaction: CommandInteraction) {
    await interaction.showModal(this.modal);
  }

  get getModal() {
    return this.modal;
  }

  get getId() {
    return this.id;
  }
}
