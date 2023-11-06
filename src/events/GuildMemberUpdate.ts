import { BotEvent } from "../types";
import { Events, GuildMember, TextChannel, Role } from "discord.js";
import { client } from "..";

const event: BotEvent = {
  name: Events.GuildMemberUpdate,
  once: false,
  async execute(oldMember: GuildMember, newMember: GuildMember) {
    // console.log("membre modifié\n");
    const oldRoles = Array.from(oldMember.roles.cache.values());
    const newRoles = Array.from(newMember.roles.cache.values());

    let addedRoles: Array<Role> = newRoles.filter((elt: Role) => {
      return oldRoles.indexOf(elt) === -1;
    });

    // console.log(addedRoles);
    // console.log(addedRoles);
    if (
      addedRoles.find((r: Role) => {
        return r.id === "680442166434070542";
      })
    ) {
      var tc: TextChannel = newMember.guild.channels.cache.get(
        "764019300230758411"
      ) as TextChannel;
      tc.send(
        `${newMember.user} a reçu le role ${newMember.roles.cache.get(
          "680442166434070542"
        )}`
      );
    }
  },
};

export default event;
