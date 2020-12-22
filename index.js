const Discord = require('discord.js');
const { refreshAllGuilds, createBotAdminChannelForAllGuilds, refresh, createBotAdminChannel } = require('./channels.js');
const client = new Discord.Client();

const config = require('./config.js');
const { CLIENT_SECRET } = require('./env.js');

const PREFIX = "!r"

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await createBotAdminChannelForAllGuilds(client);
    await refreshAllGuilds(client);
});

client.on('message', async (msg) => {
    if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

    const args = msg.content.slice(PREFIX.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command == 'refresh') await refresh(msg.guild);
});

client.on('guildCreate', createBotAdminChannel);

client.login(CLIENT_SECRET);

//https://discord.com/oauth2/authorize?client_id=790443817957589002&scope=bot&permissions=268438608