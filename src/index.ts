import { Client, GatewayIntentBits, Collection } from "discord.js";
import * as dotenv from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "./types";

dotenv.config();

//définitions des droits
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});
client.slashCommands = new Collection<string, SlashCommand>();
const handlersDirs = join(__dirname, "./handlers");

readdirSync(handlersDirs).forEach((file) => {
  require(`${handlersDirs}/${file}`)(client); //injecte le client dans tous les fichiers du répertoire handlers
});

client.login(process.env.TOKEN);
