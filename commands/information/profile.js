const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'profile',
    aliases: ['badge', 'badges', 'achievement', 'pr'],
    category: 'info',
    premium: false,
    run: async (client, message, args) => {
        const user =
            message.mentions.users.first() ||
            client.users.cache.get(args[0]) ||
            message.author

        const destroyer = user.id === '1328025198758461440' ? true : false
        let badges = ''

        const guild = await client.guilds.fetch('1177091174859800637')

        const sus = await guild.members.fetch(user.id).catch((e) => {
            if (user) badges = badges
            else badges = '`No Badge Available`'
        })

        if (destroyer === true || user.id === '1328025198758461440')
            badges =
                badges +
                `\n<:jingle:1291442476430921809>・**[Stxrs](https://discord.com/users/1328025198758461440)**`

        try {
            const dev = sus.roles.cache.has('1291097238336049194')
            if (dev === true)
                badges =
                    badges +
                    `\n<a:cx_developer:1343921594166284341>・**Developer**`

            const own = sus.roles.cache.has('1291098211305521195')
            if (own === true)
                badges = badges + `\n<a:cx_crown:1343921506345816094>・**Owner**`

            const han = sus.roles.cache.has('1291098239524933734')
            if (han === true)
                badges = badges + `\n<:HypeSquad_Events:1345323641931431978> ・**Admin**`

            const manager = sus.roles.cache.has('1291098300820361277')
            if (manager === true)
                badges = badges + `\n<a:Moderation:1345244176299724822>・**Mod**`

            const aman = sus.roles.cache.has('1291098366037594132')
            if (aman === true)
                badges =
                    badges + `\n<:EarlySupporterBooster:1345323988108316765> ・**Support Team**`

            const np = sus.roles.cache.has('1256892444214034482')
            if (fr === true)
                badges =
                   badges + `\n<a:x_dot:1345324448491769877>・**NoPrefix**`

            const hundi = sus.roles.cache.has('1291098413257199727')
            if (hundi === true)
                badges =
                    badges +
                    `\n<:kr_Bug_Hunter:1343921208412078224>・**Bug Hunter**`

            const supp = sus.roles.cache.has('1291098456529571940')
            if (supp === true)
                badges =
                    badges +
                    `\n<a:x_diamonds:1345324901472407572> ・**Premium User**`

            const fr = sus.roles.cache.has('1291098499697606676')
            if (fr === true)
                badges =
                    badges + `\n<a:BearKick:1345325744787558480>・**Friends**`

            const me = sus.roles.cache.has('1252532365935513743')
            if (fr === true)
                badges =
                    badges + `\n<:emoji_67:1345020896569462824>・**Member**`
        } catch (err) {
            if (badges) {
                badges = ''
                badges = badges
            } else if (badges === '') badges = '`No Badge Available`'
        }

        const pr = new MessageEmbed()
            .setAuthor(
                `Profile For ${user.username}#${user.discriminator}`,
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            //.setTitle(`${user.username}'s Profile`)
            .setColor(client.color)
            .setTimestamp()
            .setDescription(`**BADGES** <a:boost:1317891977316007996>
  ${badges ? badges : '`No Badge Available`'}`)
        //.setTimestamp();
        message.channel.send({ embeds: [pr] })
    }
}
