import * as ascii from "figlet";
import { CommandInteraction, Message } from "discord.js";
import { Command, Categories, NypsiCommandInteraction } from "../utils/models/Command";
import { ErrorEmbed, CustomEmbed } from "../utils/models/EmbedBuilders.js";
import { getDMsEnabled } from "../utils/economy/utils.js";
import { getPrefix } from "../utils/guilds/utils";
import { addCooldown, getResponse, onCooldown } from "../utils/cooldownhandler";

const cmd = new Command("ascii", "create ascii text", Categories.FUN);

async function run(message: Message | (NypsiCommandInteraction & CommandInteraction), args: string[]) {
    const prefix = await getPrefix(message.guild);

    if (!(await getDMsEnabled(message.member))) {
        return message.channel.send({
            embeds: [new ErrorEmbed(`you have opted out of bot dms, use ${prefix}dms to enable this command`)],
        });
    }

    if (await onCooldown(cmd.name, message.member)) {
        const embed = await getResponse(cmd.name, message.member);

        return message.channel.send({ embeds: [embed] });
    }

    if (args.length == 0) {
        const embed = new CustomEmbed(message.member)
            .setHeader("ascii help")
            .addField("usage", `${prefix}ascii hello\n${prefix}ascii hello | ghost\n${prefix}ascii <text> | <font>`)
            .addField("help", `to view different fonts use ${prefix}ascii fonts <page (1/2/3/4/5)>`);
        return message.channel.send({ embeds: [embed] });
    }

    if (args[0] == "fonts") {
        if (args.length == 1) {
            return message.channel.send({ embeds: [new ErrorEmbed(`${prefix}ascii fonts <page (1/2/3/4/5)>`)] });
        } else if (args[1] == "1") {
            const embed = new CustomEmbed(
                message.member,
                "`1Row`, `3-D`, `3D Diagonal`, `3D-ASCII`, `3x5`, `4Max`, `5 Line Oblique`, `AMC 3 Line`, `AMC 3 Liv1`, `AMC AAA01`, `AMC Neko`, `AMC Razor`, `AMC Razor2`, `AMC Slash`, `AMC Slider`, `AMC Thin`, `AMC Tubes`, `AMC Untitled`, `ANSI Shadow`, `ASCII New Roman`, `Acrobatic`, `Alligator`, `Alligator2`, `Alpha`, `Alphabet`, `Arrows`, `Avatar`, `B1FF`, `B1FF`, `Banner`, `Banner3-D`, `Banner3`, `Banner4`, `Barbwire`, `Basic`, `Bear`, `Bell`, `Benjamin`, `Big Chief`, `Big Money-ne`, `Big Money-nw`, `Big Money-se`, `Big Money-sw`, `Big`, `Bigfig`, `Binary`, `Block`, `Blocks`, `Bloody`, `Bolger`, `Braced`, `Bright`, `Broadway KB`, `Broadway`"
            )
                .setHeader("ascii fonts page 1")
                .setFooter({ text: `${prefix}ascii fonts 2 for next page` });

            return message.channel.send({ embeds: [embed] });
        } else if (args[1] == "2") {
            const embed = new CustomEmbed(
                message.member,
                "`Bubble`, `Bulbhead`, `Caligraphy`, `Caligraphy2`, `Calvin S`, `Cards`, `Catwalk`, `Chiseled`, `Chunky`, `Coinstak`, `Cola`, `Colossal`, `Computer`, `Contessa`, `Contrast`, `Cosmike`, `Crawford`, `Crawford2`, `Crazy`, `Cricket`, `Cursive`, `Cyberlarge`, `Cybermedium`, `Cybersmall`, `Cygnet`, `DANC4`, `DOS Rebel`, `DWhistled`, `Dancing Font`, `Decimal`, `Def Leppard`, `Delta Corps Priest 1`, `Diamond`, `Diet Cola`, `Digital`, `Doh`, `Doom`, `Dot Matrix`, `Double Shorts`, `Double`, `Dr Pepper`, `Efti Chess`, `Efti Font`, `Efti Italic`, `Efti Piti`, `Efti Robot`"
            )
                .setHeader("ascii fonts page 2")
                .setFooter({ text: `${prefix}ascii fonts 3 for next page` });

            return message.channel.send({ embeds: [embed] });
        } else if (args[1] == "3") {
            const embed = new CustomEmbed(
                message.member,
                "`Efti Wall`, `Efti Water`, `Electronic`, `Elite`, `Epic`, `Fender`, `Filter`, `Fire Font-k`, `Fire Font-s`, `Flipped`, `Flower Power`, `Four Tops`, `Fraktur`, `Fun Face`, `Fun Faces`, `Fuzzy`, `Georgi16`, `Georgia11`, `Ghost`, `Ghoulish`, `Glenyn`, `Goofy`, `Gothic`, `Graceful`, `Gradient`, `Graffiti`, `Greek`, `Heart Left`, `Heart Right`, `Henry 3D`, `Hex`, `Hieroglyphs`, `Hollywood`, `Horizontal Left`, `Horizontal Right`, `ICL-1900`, `Impossible`, `Invita`, `Isometric1`, `Isometric2`, `Isometric3`, `Isometric4`, `Italic`, `Ivrit`, `JS Block Letters`, `JS Bracket Letters`, `JS Capital Curves`, `JS Cursive`, `JS Stick Letters`, `Jacky`, `Jazmine`, `Jerusalem`, `Katakana`, `Kban`, `Keyboard`, `Knob`, `Konto Slant`, `Konto`, `LCD`, `Larry 3D 2`"
            )
                .setHeader("ascii fonts page 3")
                .setFooter({ text: `${prefix}ascii fonts 4 for next page` });

            return message.channel.send({ embeds: [embed] });
        } else if (args[1] == "4") {
            const embed = new CustomEmbed(
                message.member,
                "`Larry 3D`, `Lean`, `Letters`, `Lil Devil`, `Line Blocks`, `Linux`, `Lockergnome`, `Madrid`, `Marquee`, `Maxfour`, `Merlin1`, `Merlin2`, `Mike`, `Mini`, `Mirror`, `Mnemonic`, `Modular`, `Morse`, `Morse2`, `Moscow`, `Mshebrew210`, `Muzzle`, `NScript`, `NT Greek`, `NV Script`, `Nancyj-Fancy`, `Nancyj-Improved`, `Nancyj-Underlined`, `Nancyj`, `Nipples`, `O8`, `OS2`, `Octal`, `Ogre`, `Old Banner`, `Pawp`, `Peaks Slant`, `Peaks`, `Pebbles`, `Pepper`, `Poison`, `Puffy`, `Puzzle`, `Pyramid`, `Rammstein`, `Rectangles`, `Red Phoenix`, `Relief`, `Relief2`, `Reverse`, `Roman`, `Rot13`, `Rot13`, `Rotated`, `Rounded`, `Rowan Cap`, `Rozzo`, `Runic`, `Runyc`, `S Blood`, `SL Script`, `Santa Clara`, `Script`"
            )
                .setHeader("ascii fonts page 4")
                .setFooter({ text: `${prefix}ascii fonts 5 for next page` });

            return message.channel.send({ embeds: [embed] });
        } else if (args[1] == "5") {
            const embed = new CustomEmbed(
                message.member,
                "`Serifcap`, `Shadow`, `Shimrod`, `Short`, `Slant Relief`, `Slant`, `Slide`, `Small Caps`, `Small Isometric1`, `Small Keyboard`, `Small Poison`, `Small Script`, `Small Shadow`, `Small Slant`, `Small Tengwar`, `Small`, `Soft`, `Speed`, `Spliff`, `Stacey`, `Stampate`, `Stampatello`, `Standard`, `Star Strips`, `Star Wars`, `Stellar`, `Stforek`, `Stick Letters`, `Stop`, `Straight`, `Stronger Than All`, `Sub-Zero`, `Swamp Land`, `Swan`, `Sweet`, `THIS`, `Tanja`, `Tengwar`, `Term`, `Test1`, `The Edge`, `Thick`, `Thin`, `Thorned`, `Three Point`, `Ticks Slant`, `Ticks`, `Tiles`, `Tinker-Toy`, `Tombstone`, `Train`, `Trek`, `Tsalagi`, `Tubular`, `Twisted`, `Two Point`, `USA Flag`, `Univers`, `Varsity`, `Wavy`, `Weird`, `Wet Letter`, `Whimsy`, `Wow`"
            ).setHeader("ascii fonts page 5");

            return message.channel.send({ embeds: [embed] });
        } else {
            return message.channel.send({ embeds: [new ErrorEmbed(`${prefix}ascii fonts <page (1/2/3/4/5)>`)] });
        }
    }

    await addCooldown(cmd.name, message.member, 5);

    let font = "Standard";
    let text = "";

    if (args.join().includes("|")) {
        font = args.join(" ").split(" | ")[1];
        text = args.join(" ").split(" | ")[0];
    } else {
        text = args.join(" ");
    }

    let asciiString = "";
    let fail = false;

    ascii.text(text, font as ascii.Fonts, async (err, data) => {
        if (!err) {
            asciiString = "```" + data + "```";
        } else {
            fail = true;
            return message.channel.send({
                embeds: [new ErrorEmbed("error - maybe an incorrect font - fonts are **cAsE sEnSiTiVe**")],
            });
        }
    });

    setTimeout(() => {
        if (fail) {
            return;
        }

        if (asciiString.length >= 2000) {
            return message.channel.send({ embeds: [new ErrorEmbed("ascii text exceeds discord message size")] });
        }

        message.member
            .send({ content: asciiString })
            .then(() => {
                return message.channel.send({
                    embeds: [new CustomEmbed(message.member, "✅ success **-** check your dms")],
                });
            })
            .catch(() => {
                return message.channel.send({ embeds: [new ErrorEmbed("unable to send you a dm")] });
            });
    }, 500);
}

cmd.setRun(run);

module.exports = cmd;
