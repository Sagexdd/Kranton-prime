const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'giveaway',
    category: 'utility',
    description: 'Start a premium giveaway with custom embed and multiple winners',
    run: async (client, message, args) => {
        // Check if user has permission
        if (!message.member.permissions.has('MANAGE_MESSAGES') && message.guild.ownerId !== message.member.id) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('#FF0000')
                        .setDescription(
                            `<:icon_cross:1345041135156072541> **| You must be the** __Guild Owner__ **or have** \`Manage Messages\` **permission to start a giveaway.**`
                        ),
                ],
            });
        }

        // Validate input
        if (args.length < 3) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('#FFAA00')
                        .setDescription(
                            `<a:signal:1343941166533574676> **| Incorrect Usage!**\n\n**Correct Format:**\n\`$giveaway <duration> <prize> <winners>\`\n**Example:** \`$giveaway 10m Nitro Classic 3\``
                        ),
                ],
            });
        }

        const duration = args[0]; // Giveaway duration
        const prize = args.slice(1, -1).join(' '); // Prize
        let winnersCount = parseInt(args[args.length - 1]); // Number of winners

        // Convert duration to milliseconds
        const timeMap = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
        const match = duration.match(/^(\d+)([smhd])$/);

        if (!match) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('#FFAA00')
                        .setDescription(
                            `<a:signal:1343941166533574676> **| Invalid duration format!**\n\nUse: **s** (seconds), **m** (minutes), **h** (hours), or **d** (days).\n**Example:** \`10m\` for 10 minutes.`
                        ),
                ],
            });
        }

        if (isNaN(winnersCount) || winnersCount < 1) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('#FFAA00')
                        .setDescription(
                            `<a:signal:1343941166533574676> **| Number of winners must be at least** \`1\`.`
                        ),
                ],
            });
        }

        const timeValue = parseInt(match[1]);
        const timeUnit = match[2];
        const giveawayDuration = timeValue * timeMap[timeUnit];

        // Premium giveaway embed
        const giveawayEmbed = new MessageEmbed()
            .setTitle(`<a:welcome_1:1345803008432148580> **Exclusive Giveaway!** 🎁`)
            .setColor('#FFD700')
            .setDescription(
                `🎉 **Prize:** ${prize}\n\n<:timer24:1345041243805319198> **Duration:** <t:${Math.floor((Date.now() + giveawayDuration) / 1000)}:R>\n<:emoji_90:1345801936607252617> **Winners:** ${winnersCount}\n\n**React with** <a:giveaway:1343922248615989328> **to enter!**`
            )
            .setFooter({ text: `Hosted by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setThumbnail('https://cdn.discordapp.com/attachments/1345069871351857265/1345803291853848687/pixelcut-export_1.png?ex=67c5e07c&is=67c48efc&hm=ffa6a1d0b51e3bf45e7f8e88b0005d4c50503f2286897fd066eaa66df5c3df2e&'); // Add a premium-looking image

        const giveawayMessage = await message.channel.send({ embeds: [giveawayEmbed] });

        // Add reaction for participation
        await giveawayMessage.react('<a:giveaway:1343922248615989328>');

        // Timer for giveaway end
        setTimeout(async () => {
            const fetchedMessage = await message.channel.messages.fetch(giveawayMessage.id);
            const reactions = fetchedMessage.reactions.cache.get('<a:giveaway:1343922248615989328>');

            if (!reactions || reactions.count <= 1) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor('#FF0000')
                            .setDescription(
                                `<:icon_cross:1345041135156072541> **| Not enough participants! Giveaway for** **${prize}** **has been cancelled.**`
                            ),
                    ],
                });
            }

            const users = await reactions.users.fetch();
            const participants = users.filter((user) => !user.bot).map((user) => user.id);

            if (participants.length < winnersCount) {
                winnersCount = participants.length; // Reduce winners if not enough participants
            }

            const winners = [];
            for (let i = 0; i < winnersCount; i++) {
                const randomIndex = Math.floor(Math.random() * participants.length);
                winners.push(`<@${participants[randomIndex]}>`);
                participants.splice(randomIndex, 1); // Remove selected winner
            }

            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('#00FF00')
                        .setTitle(`<:emoji_90:1345801936607252617> **We Have Winners!** <a:A_Tada:1345804801392246896>`)
                        .setDescription(
                            `<a:A_Tada:1345804801392246896> **Congratulations** ${winners.join(', ')}!\n\nYou won **${prize}**! <a:welcome_1:1345803008432148580>`
                        )
                        .setFooter({ text: 'Thanks for participating! More giveaways coming soon!' })
                        .setThumbnail('https://cdn.discordapp.com/attachments/1345069871351857265/1345803291853848687/pixelcut-export_1.png?ex=67c5e07c&is=67c48efc&hm=ffa6a1d0b51e3bf45e7f8e88b0005d4c50503f2286897fd066eaa66df5c3df2e&'),
                ],
            });
        }, giveawayDuration);
    },
};
