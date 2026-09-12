import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import {
    handleLtcButton,
    handleLtcCommand,
} from "./commands/feb/ltcCommand.js";

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", () => {
    console.log(`Logged in as ${client.user!.tag}`);
});

client.on("interactionCreate", async interaction => {
    if (interaction.isButton()) {
        await handleLtcButton(interaction);
        return;
    }

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName !== "feb") return;

    if (interaction.options.getSubcommand() === "ltc") {
        await handleLtcCommand(interaction);
    }
});

client.login(process.env.DISCORD_TOKEN);