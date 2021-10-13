const { MessageEmbed } = require("discord.js");
const Vortex = require("../Vortex.json");
const moment = require("moment");
require("moment-duration-format");

exports.execute = async(client, message, args) => {

    if(!message.member.roles.cache.has(Vortex.Roles.Staff)) if(message.author.id !== Vortex.Panels.Sahip) return message.react(Vortex.Emojis.Red);

    let embed = new MessageEmbed().setColor(Vortex.Panels.EmbedColor).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    .setFooter(client.users.cache.get(Vortex.Panels.Sahip).tag, client.users.cache.get(Vortex.Panels.Sahip).avatarURL({dynamic: true}))

    let User = message.guild.members.cache.get(args[0]);
    let BotID = args[1];

    moment.locale("tr")
    let time = moment(Date.now()).format("LLL");

    await User.roles.add(Vortex.Roles.Developer).catch(e => { });

    if(!User) return message.channel.send(embed.setDescription("Kullanıcı ID'sini belirlemelisin!")).then(x => x.delete({timeout: 5000})).catch(e => { });
    if(isNaN(BotID)) return message.channel.send(embed.setDescription("Botun ID'sini Belirlemelisin!")).then(x => x.delete({timeout: 5000}).catch(e => { }))

    client.channels.cache.get(Vortex.Channels.Onay).send(`${Vortex.Emojis.Online} ${message.author}, ${User} Adlı kişinin olan <@${BotID}> botu onaylanmıştır!`).catch(e => { });
    User.send(new MessageEmbed().setColor(Vortex.Panels.EmbedColor).setFooter(`${message.author.tag} tarafından onaylandı.`, message.author.avatarURL({dynamic: true})).setTitle("Botunuz Onay Talebi Başarılı!").setDescription("Merhaba, Yakın zamanda yapdığınız bot ekleme talebiniz onaylandı.")).catch(e => { })
 
    let Onay = new MessageEmbed().setColor(Vortex.Panels.EmbedColor).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    .setFooter("Bot Onaylandı!")
    .setDescription(`
• Botu Onaylayan: ${message.author} - (\`${message.author.id}\`)
• Botu Onaylanan: ${User} - (\`${User.id}\`)
• Onaylanan Bot: <@${BotID}> - (\`${BotID}\`)
• Botu Onaylama Tarihi: \`${time}\`
`)
   client.channels.cache.get(Vortex.Channels.Staff).send(Onay).catch(e => { })
   message.react(Vortex.Emojis.Onay)
};
exports.conf = {
    command: "Onay",
    description: "",
    aliases: ["onay"]
}