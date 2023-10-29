import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import recommendations, {
  Recommendation,
} from "../../../schemas/recommendations";
import { AddRecoModal } from "../../../modals/addRecoModal";

export async function addReco(interaction: CommandInteraction) {
  const modal = new AddRecoModal(interaction.user.id);
  await interaction.showModal(modal.getModal);

  interaction
    .awaitModalSubmit({ time: 50000 })
    .then(async (result) => {
      let name = result.fields
        .getTextInputValue("name")
        .toString()
        .toLowerCase();
      let type = result.fields
        .getTextInputValue("type")
        .toString()
        .toLowerCase();
      let warnings = result.fields.getTextInputValue("warnings").split(",");
      let data: Recommendation = await recommendations.findOne({
        name: name,
        type: type,
      });

      if (data) {
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("L'oeuvre existe déjà")
              .setDescription(`L'oeuvre ${data.name} est déjà enregistrée`)
              .setColor(Colors.Red),
          ],
        });
      } else {
        await result.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Modification réussie")
              .setDescription(`L'oeuvre ${name} à été créée`)
              .setColor(Colors.Green),
          ],
        });
        await recommendations.create({
          added_by: interaction.user.username,
          user: interaction.user.id,
          type: type.replace(/^./, type[0].toUpperCase()),
          name: name.replace(/^./, name[0].toUpperCase()),
          warnings: warnings.length == 0 || warnings[0] == "" ? [] : warnings,
        });
      }
    })
    .catch((err) => console.log(err));
}
