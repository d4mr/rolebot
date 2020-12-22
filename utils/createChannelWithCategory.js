module.exports = async function createChannelWithCategory(channelName, parentName, guild) {
    let channelParent = null;

    //check if channel exists
    let channel = await guild.channels.cache.reduce(async (acc, c) => {
            if (await acc) return acc;
            else if (c.type === 'category') return null;
            else if (c.isText() && (c.name === channelName) && ((await guild.client.channels.fetch(c.parentID)).name === parentName)) {
                return c;
            }
        }, null)
    //check if channel category exists
    channelParent = await guild.channels.cache.find((c) => (c.type === 'category' && c.name === parentName));

    //else create the above
    if (!channelParent) {
        channelParent = await guild.channels.create(parentName, { type: 'category' });
    }

    if (!channel) {
        channel = await guild.channels.create(channelName, { parent: await channelParent.fetch() });
    }

    return { channel, channelParent };
}