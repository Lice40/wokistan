import { BotEvent } from "../types";
import { Client, Events, TextChannel, Guild, GuildMember } from "discord.js";
import mongoose from "mongoose";

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client) {
    if (!process.env.MONGODB_STR) return;
    await mongoose.connect(process.env.MONGODB_STR || "");

    if (mongoose.connect) {
      console.log("connection à la base de donnée établie");
    }
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
