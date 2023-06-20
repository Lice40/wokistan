import { BotEvent } from "../types";
import { TextChannel, Events, GuildMember, Client } from "discord.js";

const event: BotEvent = {
  name: Events.GuildMemberAdd,
  once: false,
  execute(member: GuildMember, client: Client) {
    console.log(client);
    var tc: TextChannel = member.guild.channels.cache.get(
      "764019300230758411"
    ) as TextChannel;
    tc.send(`on souhaite le bienvenue a ${member.user}!`);
  },
};

export default event;
