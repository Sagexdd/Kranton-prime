const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: `Show's the help command.`,
    category: 'info',
    premium: false,
    run: async (client, message, args) => {
        let prefix = message.guild?.prefix || '$'; // default prefix if not set

        const query = args[0]; // Get the query (command name) from arguments

        if (query) {
            const command = client.commands.get(query) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(query));

            if (!command) {
                return message.reply('Command not found!');
            }

            const aliases = command.aliases && command.aliases.length > 0 ? `\`${command.aliases.join(', ')}\`` : 'None';
            const embed = new MessageEmbed()
                .setColor(client.color)
                .setDescription(command.description || 'No description available.');

            // Add fields sequentially
            embed.addField('Aliases', `\`${aliases}\``);
            
            // Check if the command has subcommands
            if (command.subcommand && command.subcommand.length > 0) {
                const subcommands = command.subcommand.map(subcmd => `\`${subcmd}\``).join(', ');
                embed.addField('Subcommands', subcommands);
            }
            
            if (typeof command.premium !== 'undefined') {
                embed.addField('Premium', command.premium ? `\`Yes\`` : `\`No\``);
            }
            
            embed.addField('Usage', `\`${prefix}${command.name}\``);

            // Set author, thumbnail, and footer
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setFooter('Kranton Prime Is Love', 'https://cdn.discordapp.com/attachments/1345069871351857265/1345317049446039592/8401-white-tree-pfpsgg.gif?ex=67c41ba3&is=67c2ca23&hm=daa0bab10df80e1a4e2a8a76798bd50a0980e12b98f5989339ae028b7aabe92c&');

            return message.channel.send({ embeds: [embed] });
        }  
        // Create a MessageSelectMenu
        const selectMenu = new MessageSelectMenu()
            .setCustomId('categorySelect')
            .setPlaceholder('Harm Get Started!')
            .addOptions([
                {
                    label: 'AntiNuke',
                    value: 'antinuke',
                    description: 'Commands related to AntiNuke',
                },
                {
                    label: 'Moderation',
                    value: 'mod',
                    description: 'Commands related to Moderation',
                },
                {
                    label: 'Utility',
                    value: 'info',
                    description: 'Utility commands',
                },
                {
                    label: 'Welcomer',
                    value: 'welcomer',
                    description: 'Commands for Welcomer',
                },
                {
                    label: 'Reactionrole',
                    value: 'Reactionrole',
                    description: 'Commands for Reactionrole',
                },
                {
                    label: 'Ticket',
                    value: 'Ticket',
                    description: 'Commands for Ticket',
                },
                {
                    label: 'Voice',
                    value: 'voice',
                    description: 'Commands related to Voice',
                },
                {
                    label: 'Custom Role',
                    value: 'customrole',
                    description: 'Commands for Custom Roles',
                },
                {
                    label: 'Logging',
                    value: 'logging',
                    description: 'Commands for Logging',
                },
                {
                    label: 'Automod',
                    value: 'automod',
                    description: 'Commands for Automod',
                },
                {
                    label: 'Autorespond',
                    value: 'Autorespond',
                    description: 'Commands for Autorespond',
                },
                {
                    label: 'Giveaway',
                    value: 'Giveaway',
                    description: 'Commands for Giveaway',
                },
                {
                    label: 'Fun',
                    value: 'Fun',
                    description: 'Commands for Fun',
                },
                {
                    label: 'All Commands',
                    value: 'All Commands',
                    description: 'All Commands',
                }                                                 
            ]);

        // Buttons
        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel('Invite Me')
                .setStyle('LINK')
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`),
            new MessageButton()
                .setLabel('Support Me')
                .setStyle('LINK')
                .setURL('https://discord.gg/hjSV93j93j'),
            new MessageButton()
                .setCustomId('home')
                .setLabel('Home')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('delete')
                .setLabel('Delete')
                .setStyle('DANGER')
        );

        const initialEmbed = new MessageEmbed()
            .setColor(client.color)
            .setAuthor({
                name: `${client.user.username} Help Menu`,
                iconURL: client.user.displayAvatarURL({ dynamic: true })
            })
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(
                `Hello ! I'm **${client.user.username}**, your all-in-one server management and security bot with powerful features.\n\n \ <a:cx_ping:1343921964674449418>  **Prefix for this server** \`${prefix}\`\n<a:cx_ping:1343921964674449418>   **Total Commands: **\`${client.commands.size}\`\n<a:cx_ping:1343921964674449418>   **Type ${prefix}dangermode enable  to enhance security!**`)
            .addField('`<> - Required | () - Optional`', '\u200B', false)
            .addField(
                    '__Modules__',
                    `
                    <a:antinuke:1281624871914311710> **AntiNuke**
                    <a:Moderation:1345244176299724822>  **Moderation**
                    <:Icons_utility:1343920506797031507> **Utility**
                    <a:heart2:1343922330702712898> **Welcomer**
                    <a:hearts:1345319482104483841> **Reaction Role**
                    <a:X_Ticket:1345319927996747797> **Ticket**
                    <:voice:1345245345562497155>  **Voice**
                    <:icons_human:1343922201933385749> **Customrole**
                    <:logging:1345246399259873370> **Logging**
                    <:icons_martillo:1343940961562136608> **Automod**
                    <a:gato_hacker:1345321152301629471> **Autorespond**
                    <a:giveaway:1345321515519836202> **Giveaway**
                    <a:832282560750813215:1345321819560869899> **Fun**
                    `,
                    false
                )
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .addField(
                    'Links',
                    `[Support](https://discord.gg/hjSV93j93j) | [Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`,
                    true
                )
                .setFooter({
                    text: `Developed by Sᴛxʀᴢ.`,
                    iconURL: 'https://cdn.discordapp.com/attachments/1345069871351857265/1345318707311935558/pixelcut-export_1.png?ex=67c41d2e&is=67c2cbae&hm=031ea1221a5d25df3020de34e1b794d66b512b429e9ccc55de28c997a1cc95f9&'
                });
                

        const helpMessage = await message.channel.send({ embeds: [initialEmbed], components: [new MessageActionRow().addComponents(selectMenu), buttons] });

        const collector = helpMessage.createMessageComponentCollector({
            filter: (i) => i.user.id === message.author.id,
            time: 120000
        });

        const updateEmbed = (embed, category, commands) => {
            embed.fields = []; // Clear the fields
            embed.setDescription(`**${category.charAt(0).toUpperCase() + category.slice(1)} Commands**\n${commands.join(', ')}`);
            return embed;
        };

        collector.on('collect', async (i) => {
            if (i.isButton()) {
                if (i.customId === 'home') {
                    await helpMessage.edit({ embeds: [initialEmbed] });
                    i.deferUpdate();
                } else if (i.customId === 'delete') {
                    await helpMessage.delete();
                    i.deferUpdate();
                }
            } else if (i.isSelectMenu()) {
                const category = i.values[0];
                let commands = [];
                switch (category) {
                    case 'antinuke':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'security')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'mod':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'mod')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'info':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'info')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'welcomer':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'welcomer')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'voice':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'voice')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'automod':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'automod')
                            .map((x) => `\`${x.name}\``);
                        break;   
                    case 'customrole':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'customrole')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'logging':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'logging')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'Ticket':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'tic')
                            .map((x) => `\`${x.name}\``);
                        break; 
                    case 'Giveaway':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'give')
                            .map((x) => `\`${x.name}\``);
                        break;  
                    case 'Autorespond':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'autores')
                            .map((x) => `\`${x.name}\``);
                        break;  
                    case 'Fun':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'fun')
                            .map((x) => `\`${x.name}\``);
                        break; 
                    case 'Reactionrole':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'rrole')
                            .map((x) => `\`${x.name}\``);
                        break;  
                    case 'AI':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'ai')
                            .map((x) => `\`${x.name}\``);
                        break;                                                                                                
                                                
                }
                const updatedEmbed = updateEmbed(new MessageEmbed(initialEmbed), category, commands); // Create a new embed based on the initial one
                await helpMessage.edit({ embeds: [updatedEmbed] });
                i.deferUpdate();
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                // Disable components after 60 seconds
                selectMenu.setDisabled(true);
                buttons.components.forEach(button => button.setDisabled(true));
                helpMessage.edit({ components: [new MessageActionRow().addComponents(selectMenu), buttons] });
            }
        });

        // Add a listener for interactions not belonging to the message author
        const otherUserCollector = helpMessage.createMessageComponentCollector({
            filter: (i) => i.user.id !== message.author.id,
            time: 120000
        });

        otherUserCollector.on('collect', async (i) => {
            await i.reply({ content: 'Bro, This is not your interaction.', ephemeral: true });
        });

        // Disable dropdown and buttons after 60 seconds
        setTimeout(async () => {
            selectMenu.setDisabled(true);
            buttons.components.forEach(button => button.setDisabled(true));
            await helpMessage.edit({ components: [new MessageActionRow().addComponents(selectMenu), buttons] });
            await helpMessage.edit({ embeds: [initialEmbed] });
        }, 120000);
    }
};
