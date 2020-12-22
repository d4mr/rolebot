module.exports = async function createRole(guild, {name, color}) {        
    let role = await guild.roles.cache.find(role => role.name == name);

    if (!role) {
        role = await guild.roles.create({ data: { name, color } });
    }

    return role;
}