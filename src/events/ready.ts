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
    } else {
      console.error("the connection to the mongodb database has failed!");
      return;
    }
    console.log(`logged as ${client.user.tag}`);
    await client.guilds.cache.get(process.env.GUILD_ID).members.fetch(); //force le chargement des données des utilisateurs dans le cache !!!

    // console.log(guildMembers);
    var channelToWrite: TextChannel = client.channels.cache.get(
      process.env.BOT_CHANNEL_ID
    ) as TextChannel;
    // channelToWrite.send(`It's wokism time \n`);
  },
};

export default event;
