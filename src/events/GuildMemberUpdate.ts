import { BotEvent } from "../types";
import { Events, GuildMember, TextChannel, Client } from "discord.js";
import { client } from "..";

const event: BotEvent = {
  name: Events.GuildMemberUpdate,
  once: false,
  execute(oldMember: GuildMember, newMember: GuildMember) {
    console.log("membre modifié\n");
    if (newMember.roles.cache.get("680442166434070542")) {
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
