"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const event = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`loged as ${client.user.tag}`);
        var channelToWrite = client.channels.cache.get("764019300230758411");
        // channelToWrite.send(`Hello World <@&${process.env.ROLE_ID}>!`);
    },
};
exports.default = event;
