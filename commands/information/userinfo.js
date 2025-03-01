const { MessageEmbed } = require("discord.js");
const moment = require("moment");

let DISCORD_EMPLOYEE = `<:bot_colorstaff:1227278429653565470>`;
let DISCORD_PARTNER = `<a:partnerblyszczacy:1344550556022083668>`;
let BUGHUNTER_LEVEL_1 = `<:kr_Bug_Hunter:1343921208412078224>`;
let BUGHUNTER_LEVEL_2 = `<:ZlotyLowcaBugow:1344550507959681054>`;
let HYPESQUAD_EVENTS = `<:HypeSquad_Events:1345323641931431978>`;
let HOUSE_BRAVERY = `<:hypesquad_bravery:1345356317182922783>`;
let HOUSE_BRILLIANCE = `<:hypesquad_brilliance:1345356297872211999>`;
let HOUSE_BALANCE = `<:hypesquad_balance:1345356330524868681>`;
let EARLY_SUPPORTER = `<:EarlySupporterBooster:1345323988108316765>`;
let TEAM_USER = `<:user:1344640763207614525>`;
let SYSTEM = `<:system:1345357441084166165>`;
let VERIFIED_BOT = `<:verified_bot:1345357407320150158>`;
let VERIFIED_DEVELOPER = `<a:cx_developer:1343921594166284341> `;
let ACTIVE_DEVELOPER = `<:ActiveDeveloperBadge:1345357909336391691>`;

module.exports = {
    name: "userinfo",
    aliases: ['ui', 'whois'],
    category: 'info',
    description: "To Get Information About A User",
    run: async (client, message, args) => {
        
        let user;
        if(!args[0]) user = message.author;
        else{user = message.mentions.users.first() || client.users.cache.get(args[0])}
        let me = message.guild.members.cache.get(user.id);
        
        if(me)
        {
            let flags = '';
            let userFlags = me.user.flags.toArray();
            if(userFlags.includes('DISCORD_EMPLOYEE')) flags += ` ${DISCORD_EMPLOYEE}`;
            if(userFlags.includes('DISCORD_PARTNER')) flags += ` ${DISCORD_PARTNER}`;
            if(userFlags.includes('BUGHUNTER_LEVEL_1')) flags += ` ${BUGHUNTER_LEVEL_1}`;
            if(userFlags.includes('BUGHUNTER_LEVEL_2')) flags += ` ${BUGHUNTER_LEVEL_2}`;
            if(userFlags.includes('HYPESQUAD_EVENTS')) flags += ` ${HYPESQUAD_EVENTS}`;
            if(userFlags.includes('HOUSE_BRAVERY')) flags += ` ${HOUSE_BRAVERY}`;
            if(userFlags.includes('HOUSE_BRILLIANCE')) flags += ` ${HOUSE_BRILLIANCE}`;
            if(userFlags.includes('HOUSE_BALANCE')) flags += ` ${HOUSE_BALANCE}`;
            if(userFlags.includes('EARLY_SUPPORTER')) flags += ` ${EARLY_SUPPORTER}`;
            if(userFlags.includes('TEAM_USER')) flags += ` ${TEAM_USER}`;
            if(userFlags.includes('SYSTEM')) flags += ` ${SYSTEM}`;
            if(userFlags.includes('VERIFIED_BOT')) flags += ` ${VERIFIED_BOT}`;
            if(userFlags.includes('VERIFIED_DEVELOPER')) flags += ` ${VERIFIED_DEVELOPER}`;
            if(userFlags.includes('ACTIVE_DEVELOPER')) flags += ` ${ACTIVE_DEVELOPER}`;
            if(flags === '') flags = `${client.emoji.cross} Null User Badges`;

            let keys = '';
            let f = me.permissions.toArray();
            if(f.includes('ADMINISTRATOR')) keys = `Server Administrator`;
            if(f.includes(['MODERATE_MEMBERS','KICK_MEMBERS','BAN_MEMBERS'])) keys = 'Server Moderator';
            if(me.user.id === message.guild.ownerId) keys = 'Server Owner';
            else keys = 'Server Member';
            
            let emb = new MessageEmbed().setColor(client.color).setAuthor({name : `${me.user.tag}'s Information` , iconURL : me.user.displayAvatarURL({dynamic : true})}).setThumbnail(me.user.displayAvatarURL({dynamic : true})).addFields([
                {
                    name : `__General Information__`,
                    value : `**Name** : \`${me.user.username}\` \n **Discriminator** : \`${me.user.discriminator}\` \n **Nickname** : ${me.nickname ? me.nickname : '`None`'} \n\n**Overview**\n **Badges** : ${flags} \n **Type** : ${me.user.bot ? `Bot` : `Human`}`
                },
                {
                    name : `**Server Relating Information**`,
                    value : `**Roles** : ${me.roles.cache.size < 0 ? [...me.roles.cache.values()].sort((a,b) => b.rawPosition - a.rawPosition).map(r => `<@&${r.id}>`).join(', ') : me.roles.cache.size > 30 ? trimArray(me.roles.cache) : 'NO ROLES'}`
                },
                { name: `**Key Permissions**`, value: `\`${me.permissions.toArray().sort((a, b) => a.localeCompare(b)).map(x => x.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().replace(/^./, match => match.toUpperCase())).join(', ')}\`` },
                {
                    name : `**Misc Information**`,
                    value : `**Created On** : <t:${Math.round(me.user.createdTimestamp / 1000)}:R> \n **Joined On** : <t:${Math.round(me.joinedTimestamp / 1000)}:R>`
                }
            ]).setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})});
            return message.channel.send({embeds : [emb]});
        }
        if(!me)
        {
            let flags = '';
            let userFlags = me.user.flags.toArray();
            if(userFlags.includes('DISCORD_EMPLOYEE')) flags += ` ${DISCORD_EMPLOYEE}`;
            if(userFlags.includes('DISCORD_PARTNER')) flags += ` ${DISCORD_PARTNER}`;
            if(userFlags.includes('BUGHUNTER_LEVEL_1')) flags += ` ${BUGHUNTER_LEVEL_1}`;
            if(userFlags.includes('BUGHUNTER_LEVEL_2')) flags += ` ${BUGHUNTER_LEVEL_2}`;
            if(userFlags.includes('HYPESQUAD_EVENTS')) flags += ` ${HYPESQUAD_EVENTS}`;
            if(userFlags.includes('HOUSE_BRAVERY')) flags += ` ${HOUSE_BRAVERY}`;
            if(userFlags.includes('HOUSE_BRILLIANCE')) flags += ` ${HOUSE_BRILLIANCE}`;
            if(userFlags.includes('HOUSE_BALANCE')) flags += ` ${HOUSE_BALANCE}`;
            if(userFlags.includes('EARLY_SUPPORTER')) flags += ` ${EARLY_SUPPORTER}`;
            if(userFlags.includes('TEAM_USER')) flags += ` ${TEAM_USER}`;
            if(userFlags.includes('SYSTEM')) flags += ` ${SYSTEM}`;
            if(userFlags.includes('VERIFIED_BOT')) flags += ` ${VERIFIED_BOT}`;
            if(userFlags.includes('VERIFIED_DEVELOPER')) flags += ` ${VERIFIED_DEVELOPER}`;
            if(userFlags.includes('ACTIVE_DEVELOPER')) flags += ` ${ACTIVE_DEVELOPER}`;
            if(flags === '') flags = `${client.emoji.cross} Null User Badges`;

            let em = new MessageEmbed().setColor(client.color).setAuthor({name : `${user.username}'s Information` , iconURL : user.displayAvatarURL({dynamic : true})}).addFields([
                {
                    name : `__General Information__`,
                    value : `**UserName** : ${user.username} \n **User ID** : ${user.id} \n **Bot?** : ${user.bot ? `${client.emoji.tick}` : `${client.emoji.cross}`} \n **Discord Badges** : ${flags} \n **Account Created** : <t:${Math.round(user.createdTimestamp / 1000)}:R>`
                }
            ]).setFooter({text : `Requested By : ${message.author.tag} | This User is not from this guild` , iconURL : message.author.displayAvatarURL({dynamic : true})}).setThumbnail(user.displayAvatarURL({dynamic : true}));

            return message.channel.send({embeds : [em]});
        }
        else{
            return message.channel.send({embeds : [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | I was unable to find the user.`)]})
        }
    }
}

function trimArray(arr, maxLen = 25) {
    if ([...arr.values()].length > maxLen) {
      const len = [...arr.values()].length - maxLen;
      arr = [...arr.values()].sort((a, b) => b?.rawPosition - a.rawPosition).slice(0, maxLen);
      arr.map(role => `<@&${role.id}>`)
      arr.push(`${len} more...`);
    }
    return arr.join(", ");
}
