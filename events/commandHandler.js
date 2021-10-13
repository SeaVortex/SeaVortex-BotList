const Discord = require("discord.js");
const Vortex = require("../Vortex.json")

exports.execute = async (message) => {
let client = message.client;
if (message.author.bot) return
if (!message.guild) return;
if (message.content.startsWith(Vortex.Panels.Prefix)) {
let args = message.content.split(" ");
let command = args[0].substring(Vortex.Panels.Prefix.length);
args = args.splice(1)
if (client.commands.has(command)) {
client.commands.get(command).execute(client, message, args);
} else if(client.aliases.has(command)) {
client.aliases.get(command).execute(client, message, args);
}
return
};
};

exports.conf = {
    event: "message" // Eventin ne olduğunu belirliyoruz.
};