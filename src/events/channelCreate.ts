import { GuildChannel } from "discord.js";
import { getMuteRole, profileExists } from "../utils/moderation/utils";

export default async function channelCreate(channel: GuildChannel) {
    if (!channel.guild) return;

    if (!(await profileExists(channel.guild))) return;

    if ((await getMuteRole(channel.guild)) == "timeout") return;

    let muteRole = await channel.guild.roles.fetch(await getMuteRole(channel.guild));

    if (!(await getMuteRole(channel.guild))) {
        muteRole = channel.guild.roles.cache.find((r) => r.name.toLowerCase() == "muted");
    }

    if (!muteRole) return;

    channel.permissionOverwrites
        .edit(muteRole, {
            SendMessages: false,
            Speak: false,
            AddReactions: false,
        })
        .catch(() => {});
}
