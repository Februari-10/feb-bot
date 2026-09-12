import { SlashCommandBuilder } from "discord.js";
import { ltcCommand } from "./feb/ltcCommand.js";

export const febCommand = new SlashCommandBuilder()
    .setName("feb")
    .setDescription("FebBot goated commands")
    .addSubcommand(ltcCommand);