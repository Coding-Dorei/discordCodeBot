const {SlashCommandBuilder} = require('@discordjs/builders')

const data = require('../info.json')

module.exports = {
    data:new SlashCommandBuilder()
        .setName('info')
        .setDescription('show information'),
    async execute(interaction) {
        await interaction.reply(`만든 사람:${data.madeBy}\n사용된 언어:${data.Language}\n깃허브 주소:${data.github}`)
    }
}