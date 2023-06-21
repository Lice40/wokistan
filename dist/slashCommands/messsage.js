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
    name: "message",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("message")
        .setDescription("sends a msg")
        .addStringOption((option) => {
        return option
            .setName("message")
            .setDescription("message à afficher")
            .setRequired(true);
    }),
    execute: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const message = interaction.options.get("message").value.toString();
        yield interaction.reply({ content: `valeur du message: ${message}` });
    }),
};
