const config = require("./config");
const createChannelWithCategory = require("./utils/createChannelWithCategory");
const createRole = require("./utils/createRole");
const { sendBotRolesMessage } = require("./roles.js")

async function createRestrictedChannels(guild) {
    for (const key of Object.keys(config.roles)) {
        let role = await createRole(guild, { name: key, color: config.roles[key].color });

        for await (const channelData of config.roles[key].channels) {
            let { channel, channelParent } = await createChannelWithCategory(channelData.name, channelData.category, guild);
            if (channel.permissionsFor(guild.roles.everyone).has('SEND_MESSAGES') || !channel.permissionsFor(role).has('SEND_MESSAGES')) {
                await channel.overwritePermissions([
                    { id: guild.roles.everyone, deny: ['SEND_MESSAGES'] },
                    { id: role, allow: ['SEND_MESSAGES'] }
                ]);
            }
        }
    }
}

async function createBotAdminChannelForAllGuilds(client) {
    for (const [guildId, guild] of client.guilds.cache) {
        await createBotAdminChannel(guild);
    };
}

async function createBotAdminChannel(guild) {
    let { channel, channelParent } = await createChannelWithCategory(config['bot-admin-channel'].name, config['bot-admin-channel'].category, guild);
    let botAdminRole = await createRole(guild, { name: config['bot-admin-role'] });

    // check if permissions are okay or fix
    if (!channel.permissionsFor(botAdminRole).has('VIEW_CHANNEL') || channel.permissionsFor(guild.roles.everyone).has('VIEW_CHANNEL') || !channel.permissionsFor(await guild.client.user.fetch()).has('VIEW_CHANNEL')) {
        await channelParent.overwritePermissions([
            { id: guild.roles.everyone, deny: ['VIEW_CHANNEL'] },
            { id: botAdminRole, allow: ['VIEW_CHANNEL'] },
            { id: await guild.client.user.fetch(), allow: ['VIEW_CHANNEL'] }
        ]);
        await channel.lockPermissions();
    }
}

async function createBotMessageChannel(guild) {
    let { channel, channelParent } = await createChannelWithCategory(config['bot-message-channel'].name, config['bot-message-channel'].category, guild);

    //check permissions
    if (channel.permissionsFor(guild.roles.everyone).has('SEND_MESSAGES') || !channel.permissionsFor(await guild.client.user.fetch()).has('SEND_MESSAGES')) {
        await channelParent.overwritePermissions([
            { id: guild.roles.everyone, deny: ['SEND_MESSAGES'] },
            { id: await guild.client.user.fetch(), allow: ['SEND_MESSAGES'] }
        ]);
        await channel.lockPermissions();
    }

    return channel;
}

async function refresh(guild) {
    let messageChannel = await createBotMessageChannel(guild);
    // await createCustomRolesAndChannels();

    let oldMsgs = await messageChannel.messages.fetch({ limit: 10 })
    await oldMsgs.forEach(async (m) => {
        if (m.author === await guild.client.user.fetch()) {
            return m.delete();
        }
    })

    await createRestrictedChannels(guild);
    await sendBotRolesMessage(messageChannel);
}

async function refreshAllGuilds(client) {
    for (const [guildId, guild] of client.guilds.cache) {
        await refresh(guild);
    }
}

module.exports = {
    createBotMessageChannel,
    createBotAdminChannel,
    createBotAdminChannelForAllGuilds,
    refresh,
    refreshAllGuilds
}