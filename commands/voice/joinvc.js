const { Client, Message, MessageEmbed } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: "joinvc",
    aliases: ["summon", "vcjoin"],
    category: "voice",
    premium: false,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        // Check if user is in a voice channel
        const channel = message.member.voice.channel;
        if (!channel) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | You need to be in a **voice channel** for me to join!`
                        )
                ]
            });
        }

        // Check if bot has permission to join VC
        if (!channel.permissionsFor(client.user).has("CONNECT")) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | I don't have permission to **join** this voice channel.`
                        )
                ]
            });
        }

        if (!channel.permissionsFor(client.user).has("SPEAK")) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | I don't have permission to **speak** in this voice channel.`
                        )
                ]
            });
        }

        // Join the voice channel
        try {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
                selfDeaf: true, // Bot will mute itself
            });

            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:tick_icons:1345041197483298856> | Successfully joined **${channel.name}**!`
                        )
                ]
            });
        } catch (err) {
            console.error(err);
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | Failed to join the voice channel.`
                        )
                ]
            });
        }
    }
};
