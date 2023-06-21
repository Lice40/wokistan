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
const event = {
    name: discord_js_1.Events.GuildMemberUpdate,
    once: false,
    execute(oldMember, newMember) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("membre modifié\n");
            const oldRoles = Array.from(oldMember.roles.cache.values());
            const newRoles = Array.from(newMember.roles.cache.values());
            let addedRoles = newRoles.filter((elt) => {
                return oldRoles.indexOf(elt) === -1;
            });
            console.log(addedRoles);
            console.log(addedRoles);
            if (addedRoles.find((r) => {
                return r.id === "680442166434070542";
            })) {
                var tc = newMember.guild.channels.cache.get("764019300230758411");
                tc.send(`${newMember.user} a reçu le role ${newMember.roles.cache.get("680442166434070542")}`);
            }
        });
    },
};
exports.default = event;
