import { BotEvent } from "../types";
import { Client, Events, TextChannel, Guild, GuildMember } from "discord.js";

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client) {
    console.log(`logged as ${client.user.tag}`);
    await client.guilds.cache.get(process.env.GUILD_ID).members.fetch(); //force le chargement des données des utilisateurs dans le cache !!!

    // console.log(guildMembers);
    var channelToWrite: TextChannel = client.channels.cache.get(
      "764019300230758411"
    ) as TextChannel;
    // channelToWrite.send(`Hello World <@&${process.env.ROLE_ID}>!`);
  },
};

export default event;
