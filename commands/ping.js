const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data:new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .addIntegerOption(option => option.setName('repeat').setDescription('repeat n times')),
    async execute(interaction) {
        await interaction.reply('Pong!')
    }
}