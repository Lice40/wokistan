"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = require("path");
const fs_1 = require("fs");
const rest_1 = require("@discordjs/rest");
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const body = [];
    let slashCommandsDir = (0, path_1.join)(__dirname, "../slashCommands");
    (0, fs_1.readdirSync)(slashCommandsDir).forEach((file) => {
        if (!file.endsWith(".js"))
            return;
        const command = require(`${slashCommandsDir}/${file}`).command;
        body.push(command.data.toJSON());
        client.slashCommands.set(command.name, command);
    });
    const rest = new rest_1.REST({ version: "10" }).setToken(process.env.TOKEN);
    try {
        yield rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), {
            body: body,
        });
    }
    catch (error) {
        console.error(error);
    }
});
