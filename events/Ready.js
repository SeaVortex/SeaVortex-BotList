const Discord = require("discord.js");
const Vortex = require("../Vortex.json");
const client = global.client;

exports.execute = async () => {
    client.user.setPresence({ activity: { name: Vortex.Panels.Bio}, status: Vortex.Panels.Bio });
};

exports.conf = {
  event: "ready"
};