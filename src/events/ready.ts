import { BotEvent } from "../types";
import { Client, Events, TextChannel } from "discord.js";

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log(`loged as ${client.user.tag}`);
    var channelToWrite: TextChannel = client.channels.cache.get(
      "764019300230758411"
    ) as TextChannel;
    // channelToWrite.send(`Hello World <@&${process.env.ROLE_ID}>!`);
  },
};

export default event;
