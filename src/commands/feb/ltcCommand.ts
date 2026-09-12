import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
} from "discord.js";
import { createBaseEmbed } from "../../utils/embedUtils.js";
import { getLtcPrice } from "../../utils/cryptoUtils.js";

const ltcAddress = "LMQWDnrqxvJoyuwkhEyEMfpSAhd8w7gyAu";

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
            `**$${amount.toFixed(2)} USD:**\n\`\`\`\n${ltcAmount.toFixed(8)} LTC\n\`\`\`\n` +
            `**Send LTC to:**\n\`\`\`\n${ltcAddress}\n\`\`\``,
        );

    const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
            .setCustomId(`ltc_amount_${ltcAmount.toFixed(8)}`)
            .setLabel("Copy Amount")
            .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
            .setCustomId("ltc_address")
            .setLabel("Copy Address")
            .setStyle(ButtonStyle.Secondary),
    );

    await interaction.reply({
        embeds: [embed],
        components: [buttons],
    });
}

export async function handleLtcButton(interaction: ButtonInteraction) {
    if (interaction.customId === "ltc_address") {
        await interaction.reply({
            content: `\`${ltcAddress}\``,
            ephemeral: true,
        });

        return;
    }

    if (interaction.customId.startsWith("ltc_amount_")) {
        const amount = interaction.customId.replace("ltc_amount_", "");

        await interaction.reply({
            content: `\`${amount}\``,
            ephemeral: true,
        });
    }
}