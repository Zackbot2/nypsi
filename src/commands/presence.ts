import { CommandInteraction, Message } from "discord.js";
import { setCustomPresence } from "../utils/functions/presence";
import { NypsiClient } from "../utils/models/Client";
import { Categories, Command, NypsiCommandInteraction } from "../utils/models/Command";

const cmd = new Command("presence", "set custom a presence for nypsi", Categories.NONE);

async function run(message: Message | (NypsiCommandInteraction & CommandInteraction), args: string[]) {
    if (message.author.id != "672793821850894347") return;

    if (args.length == 0) {
        await setCustomPresence("");
    } else {
        if (args[0].startsWith("https://www.youtube.com")) {
            await setCustomPresence(args.join(" "));

            (message.client as NypsiClient).cluster.broadcastEval(
                (c, { args }) => {
                    const url = args.shift();
                    c.user.setPresence({
                        activities: [
                            {
                                type: 1,
                                url: url,
                                name: args.join(" "),
                            },
                        ],
                    });
                },
                { context: { args: args } }
            );
        } else {
            await setCustomPresence(args.join(" "));

            (message.client as NypsiClient).cluster.broadcastEval(
                (c, { args }) => {
                    c.user.setPresence({
                        activities: [
                            {
                                type: 0,
                                name: args.join(" "),
                            },
                        ],
                    });
                },
                { context: { args: args } }
            );
        }
    }
}

cmd.setRun(run);

module.exports = cmd;
