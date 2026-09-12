import { EmbedBuilder } from "discord.js";

export function createBaseEmbed() {
    return new EmbedBuilder()
        .setColor(0x210feb)
        .setFooter({ text: "FebBot owned by @februari10" });
}