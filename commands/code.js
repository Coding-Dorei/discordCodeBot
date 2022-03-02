const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('code')
        .setDescription("Get codes from Coding-Dorei's github")//description 안달아주면 에러남
        .addStringOption(option => option.setName('lecture').setDescription('lecture name').setRequired(true))
        .addIntegerOption(option => option.setName('week').setDescription("week").setRequired(true))
        .addIntegerOption(option => option.setName('number').setDescription('Number').setRequired(true)),
    async execute(interaction){
        await interaction.reply(crawler.crawl(lecture,week,number))
    }
}