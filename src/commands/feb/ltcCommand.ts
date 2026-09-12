import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from "discord.js";
import { createBaseEmbed } from "../../utils/embedUtils.js";
import { getLtcPrice } from "../../utils/cryptoUtils.js";

export function ltcCommand(subcommand: SlashCommandSubcommandBuilder) {
    return subcommand
        .setName("ltc")
        .setDescription("Gives Feb's ltc addy and shi")
        .addNumberOption(option =>
            option
                .setName("amount")
                .setDescription("American dollar $$$ amount")
                .setRequired(true),
        );
}

export async function handleLtcCommand(
    interaction: ChatInputCommandInteraction,
) {
    const amount = interaction.options.getNumber("amount", true);
    const ltcPrice = await getLtcPrice();
    const ltcAmount = amount / ltcPrice;

    const embed = createBaseEmbed()
    .setTitle("Send Feb his ltc")
    .setDescription(
        `**$${amount.toFixed(2)} USD:**\n\`\`\`\n${ltcAmount.toFixed(8)} LTC\n\`\`\`\n**Send LTC to:**\n\`\`\`\nLMQWDnrqxvJoyuwkhEyEMfpSAhd8w7gyAu\n\`\`\``,
    );

    await interaction.reply({
        embeds: [embed],
    });
}