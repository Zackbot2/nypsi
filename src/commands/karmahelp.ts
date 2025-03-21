import { CommandInteraction, Message } from "discord.js";
import { Command, Categories, NypsiCommandInteraction } from "../utils/models/Command";
import { CustomEmbed } from "../utils/models/EmbedBuilders.js";
import { getPrefix } from "../utils/guilds/utils";

const cmd = new Command("karmahelp", "help about the karma system", Categories.INFO);

async function run(message: Message | (NypsiCommandInteraction & CommandInteraction)) {
    const embed = new CustomEmbed(message.member).setTitle("karma help");

    embed.setDescription(
        "karma is an xp-like system that rewards you for simply using nypsi\n\ninteraction with nypsi in different ways rewards you with different amounts of karma, but your karma will not update instantly\n\nif you stop using nypsi for a period of time, your karma will deteriorate over time\n\n**what is karma used for?**\noccasionally, the karma shop will be opened, allowing you to buy things with your karma, such as premium membership, economy xp and crates"
    );

    embed.setFooter({ text: `${await getPrefix(message.guild)}karmashop` });

    return message.channel.send({ embeds: [embed] });
}

cmd.setRun(run);

module.exports = cmd;
