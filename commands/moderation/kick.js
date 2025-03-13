const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    aliases: ['k'],
    category: 'mod',
    premium: false,
    run: async (client, message, args) => {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | You must have \`Kick Members\` permissions to use this command.`
                        )
                ]
            });
        }

        if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | I don't have permission to kick members.`
                        )
                ]
            });
        }

        let isOwner = message.author.id === message.guild.ownerId;
        let user = await getUserFromMention(message, args[0]);

        if (!user) {
            try {
                user = await message.guild.members.fetch(args[0]);
            } catch (error) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(
                                `<:icon_cross:1345041135156072541>> | Please provide a valid user ID or mention a member.`
                            )
                    ]
                });
            }
        }

        if (!user) return message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(client.color)
                    .setDescription(`${client.emoji.cross} | Mention the user first`)
            ]
        });

        if (user.id === client.user.id)
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | You can't kick me.`
                        )
                ]
            });

        if (user.id === message.guild.ownerId)
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | I can't kick the owner of this server.`
                        )
                ]
            });

        // Debugging role positions
        console.log(`Executor Role Position: ${message.member.roles.highest.position}`);
        console.log(`Bot Role Position: ${message.guild.me.roles.highest.position}`);
        console.log(`Target Role Position: ${user.roles.highest.position}`);

        // Allow server owner and admins to bypass role check
        if (!isOwner && !message.member.permissions.has("ADMINISTRATOR") && message.member.roles.highest.position <= message.guild.me.roles.highest.position) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | You must have a higher role than me to use this command.`
                        )
                ]
            });
        }

        if (user.roles.highest.position >= message.guild.me.roles.highest.position) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:icon_cross:1345041135156072541> | My highest role must be above **${user.user.tag}** to kick them.`
                        )
                ]
            });
        }

        let reason = args.slice(1).join(' ') || 'No Reason Provided';
        reason = `${message.author.tag} (${message.author.id}) | ` + reason;

        const notifyEmbed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(
                `You have been kicked from **${message.guild.name}**.\n**Executor:** ${message.author.tag}\n**Reason:** \`${reason}\``
            )
            .setColor(client.color)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

        await user.send({ embeds: [notifyEmbed] }).catch(() => null);
        await message.guild.members.kick(user.id, reason).catch(() => null);

        const successEmbed = new MessageEmbed()
            .setDescription(
                `<:tick_icons:1345041197483298856> | Successfully kicked **${user.user.tag}** from the server.`
            )
            .setColor(client.color);

        return message.channel.send({ embeds: [successEmbed] });
    }
};

function getUserFromMention(message, mention) {
    if (!mention) return null;
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return null;
    const id = matches[1];
    return message.guild.members.fetch(id);
}
