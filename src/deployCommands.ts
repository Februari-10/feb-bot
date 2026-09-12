import "dotenv/config";
import { REST, Routes } from "discord.js";
import { febCommand } from "./commands/febCommand.js";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;

if (!token || !clientId) {
    throw new Error("I think we be missing DISCORD_TOKEN or DISCORD_CLIENT_ID go tryna check .env");
}

const rest = new REST({ version: "10" }).setToken(token);

async function deployCommands() {
    console.log("We tryna register /feb rn i think");

    await rest.put(
        Routes.applicationCommands(clientId!),
        {
            body: [febCommand.toJSON()],
        },
    );

    console.log("Aight we registered /feb succesfully!!!");
}

deployCommands();