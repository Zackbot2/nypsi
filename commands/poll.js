const { Message } = require("discord.js");
const { Command, categories } = require("../utils/classes/Command");
const { ErrorEmbed, CustomEmbed } = require("../utils/classes/EmbedBuilders.js")

const cooldown = new Map();

const cmd = new Command("poll", "create a poll with a lot of customisation", categories.INFO)

/**
 * @param {Message} message 
 * @param {Array<String>} args 
 */
async function run(message, args) {

    if (cooldown.has(message.member.id)) {
        const init = cooldown.get(message.member.id)
        const curr = new Date()
        const diff = Math.round((curr - init) / 1000)
        let time = 10 - diff

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            time = 60 - diff
        }

        const minutes = Math.floor(time / 60)
        const seconds = time - minutes * 60

        let remaining

        if (minutes != 0) {
            remaining = `${minutes}m${seconds}s`
        } else {
            remaining = `${seconds}s`
        }

        return message.channel.send(new ErrorEmbed(`still on cooldown for \`${remaining}\``));
    }

    if (args.length == 0) {
        const embed = new CustomEmbed(message.member, false)
            .setTitle("poll help")
            .addField("usage", "$poll (choices) <title> | (text) | (hex color)")
            .addField("help", "**<>** required | **()** optional\n" +
                "after creation your message will be deleted and an embed will be created with your text and color if given\n" +
                "if a number isnt found for choices then 👍👎 emojis will be used\n" +
                "largest number of choices is 10, and 1 is minimum")
            .addField("examples", "$poll question?\n" +
                "$poll 2 title | this is a description\n" +
                "$poll 9 hello | this is a description | #13c696")

        return message.channel.send(embed)
    }

    if (message.member.hasPermission("MANAGE_MESSAGES") && !message.member.hasPermission("ADMINISTRATOR")) {
        cooldown.set(message.member.id, new Date());
        setTimeout(() => {
            cooldown.delete(message.member.id);
        }, 10000);
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.hasPermission("ADMINISTRATOR")) {
        cooldown.set(message.member.id, new Date());
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 60000)
    }

    let choices = 0

    if (parseInt(args[0])) {
        const num = parseInt(args[0])

        if (num < 2) {
            choices = 0
        } else if (num > 10) {
            choices = 10
        } else {
            choices = num
        }

        if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.hasPermission("ADMINISTRATOR") && num > 2) {
            choices = 2
        }
        args.shift()
    }

    let mode = ""

    if (!message.content.includes("|")) {
        mode = "title_only"
    } else if (args.join(" ").split("|").length == 2) {
        mode = "title_desc"
    } else if (args.join(" ").split("|").length == 3) {
        mode = "title_desc_color"
    }

    const title = args.join(" ").split("|")[0]
    let description, color
    
    if (mode.includes("desc")) {
        description = args.join(" ").split("|")[1]
    } 

    if (mode.includes("color")) {
        color = args.join(" ").split("|")[2]
    }

    const embed = new CustomEmbed(message.member)
        .setTitle(title)
    
    if (color) embed.setColor(color)

    if (mode.includes("desc")) {
        embed.setDescription(description)
    }

    if (!message.member.hasPermission("ADMINISTRATOR")) {
        embed.setHeader(message.member.user.tag)
    }
    
    message.channel.send(embed).then(async m => {
        await message.delete().catch()
        
        if (choices == 0) {
            await m.react("👍")
            await m.react("👎")
        } else if (choices >= 2) {
            await m.react("1️⃣")
            await m.react("2️⃣")
        }

        if (choices >= 3) await m.react("3️⃣")
        if (choices >= 4) await m.react("4️⃣")
        if (choices >= 5) await m.react("5️⃣")
        if (choices >= 6) await m.react("6️⃣")
        if (choices >= 7) await m.react("7️⃣")
        if (choices >= 8) await m.react("8️⃣")
        if (choices >= 9) await m.react("9️⃣")
        if (choices == 10) await m.react("🔟")

    })

}

cmd.setRun(run)

module.exports = cmd