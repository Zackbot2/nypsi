import { CommandInteraction, Message } from "discord.js";
import { Command, Categories, NypsiCommandInteraction } from "../utils/models/Command";
import { CustomEmbed, ErrorEmbed } from "../utils/models/EmbedBuilders";
import { reset } from "../utils/economy/utils";
import { createCaptcha } from "../utils/functions/captcha";

const cmd = new Command("reseteco", "reset economy except prestige and karma", Categories.NONE);

async function run(message: Message | (NypsiCommandInteraction & CommandInteraction)) {
    if (message.author.id != "672793821850894347") return;

    const captcha = createCaptcha();

    const embed = new CustomEmbed(message.member, "please type the string sent to console");

    console.log(
        "--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---\n" +
            "enter the captcha into discord\n" +
            captcha.display +
            "\n--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---"
    );

    await message.channel.send({ embeds: [embed] });

    const filter = (msg: Message) => message.author.id == msg.author.id;

    let response: any = await message.channel.awaitMessages({
        filter,
        max: 1,
    });

    response = response.first().content;

    if (response != captcha.answer) {
        return message.channel.send({ embeds: [new ErrorEmbed("captcha failed")] });
    } else {
        const c = await reset();

        return message.channel.send({
            embeds: [new CustomEmbed(message.member, `${c} users reset`)],
        });
    }
}

cmd.setRun(run);

module.exports = cmd;
