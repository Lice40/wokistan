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
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: "react",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("react")
        .setDescription("Sends a message with a reaction"),
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const msg = yield interaction.reply({
            content: "Message avec réaction",
            fetchReply: true,
        });
        yield msg.react("😄");
    }),
};
