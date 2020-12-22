const config = require("./config");
const Discord = require('discord.js');
const createRole = require("./utils/createRole");

const NUMBERED_REACTIONS = ["\u0031\u20E3", "\u0032\u20E3", "\u0033\u20E3", "\u0034\u20E3", "\u0035\u20E3", "\u0036\u20E3", "\u0037\u20E3", "\u0038\u20E3", "\u0039\u20E3", "\ud83d\udd1f"];


async function sendBotRolesMessage(channel) {
    let embed = new Discord.MessageEmbed()
        .setColor(config['roles-message'].color)
        .setTitle(config['roles-message'].title)
        // .setURL('https://discord.js.org/')
        .setAuthor(config['roles-message'].author)
        .setDescription(config['roles-message'].description + "\n\n\n" + (Object.keys(config.roles).map((key, i) => {
            return `${NUMBERED_REACTIONS[i]} \t ${key}`;
        })).join('\n\n'));
    // .setThumbnail('https://i.imgur.com/wSTFkRM.png')
    // .addFields(
    //     ...Object.keys(config.roles).map((key, i) => {
    //         return { name: '\n', value: `${NUMBERED_REACTIONS[i]} | ${key} |` }
    //     })
    // )
    // .addField('Inline field title', 'Some value here', true)
    // .setImage('https://i.imgur.com/wSTFkRM.png')
    // .setTimestamp()
    // .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

    let message = await channel.send(embed);
    await Promise.all(Object.keys(config.roles).map((key, i) => message.react(NUMBERED_REACTIONS[i]))).then(msgs => message.createReactionCollector((reaction, user) => !user.bot, { dispose: true })).then(collector => {
        collector.on('collect', handleReact);
        collector.on('remove', handleUnreact);
    });

}

function handleReact(reaction, user) {
    let reactionIndex = NUMBERED_REACTIONS.indexOf(reaction.emoji.name);
    if (!reactionIndex === -1) {
        console.error("wtf");
        return;
    }
    let roleName = Object.keys(config.roles)[reactionIndex];
    let roleColor = config.roles[roleName].color;

    addRoleToUser({ name: roleName, color: roleColor }, user, reaction.message.guild);
}

function handleUnreact(reaction, user) {
    let reactionIndex = NUMBERED_REACTIONS.indexOf(reaction.emoji.name);
    if (reactionIndex === -1) {
        console.error("wtf");
        return;
    }
    let roleName = Object.keys(config.roles)[reactionIndex];
    let roleColor = config.roles[roleName].color;

    removeRoleFromUser({ name: roleName, color: roleColor }, user, reaction.message.guild);
}

async function removeRoleFromUser(roleData, user, guild) {
    let role = await createRole(guild, roleData);
    await guild.member(user).roles.remove(role);
}

async function addRoleToUser(roleData, user, guild) {
    let role = await createRole(guild, roleData);
    await guild.member(user).roles.add(role);
}

module.exports = {
    sendBotRolesMessage,
    handleReact,
    handleUnreact,
    removeRoleFromUser,
    addRoleToUser
}