const fs = require('node:fs');
const { Client, Collection, Intents} = require('discord.js');

const token = process.env.token

const port = process.env.PORT

const app = require("express")()
app.get('/',(req,res)=>{
	console.log("get")
	res.send({
		"success" : "0000",
		"OJ_Bot" : "online"
	})
})
app.listen(port,()=>{
	console.log("running")
})

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const axios = require('axios')

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate',async interaction =>{
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		const repeat = interaction.options.getInteger('repeat')
		console.dir(repeat)
		await interaction.reply("Pong!\n".repeat(repeat))
	}else if(interaction.commandName === 'code') {
		const lecture = interaction.options.getString('lecture')
		const week = interaction.options.getInteger('week')
		const number = interaction.options.getInteger('number')
        const baseUrl = "https://raw.githubusercontent.com/Coding-Dorei/"
		let res = null
		let conf = {};
    	conf.validateStatus = (status) => {
        	return (status >= 200 && status < 300) || status == 404
   		}
		try{
			res = axios.get(baseUrl + `/${lecture}` + '/master' + `/${week}` + `${encodeURIComponent("주차")}` + `/${number}.c`,conf).then(html=>{
				//console.log("data:" + html.data)
				if(html.data)interaction.reply(`${lecture}의 ${week}주차 ${number}번 문제 코드입니다\n`+ html.data.toString('utf8'))
			})
			// res = axios({
			// 	url:baseUrl + `/${lecture}` + '/master' + `/${week}` + `${encodeURIComponent("주차")}` + `/${number}.c`,
			// 	method:"GET",
			// 	responsType:'arraybuffer'
			// }).then(html => {
			// 	console.log(html.data)
			// 	interaction.reply(`${lecture}의 ${week}주차 ${number}번 문제 코드입니다\n`+iconv.decode(html.data,'utf8'))
			// })
		}catch(err){
			console.log('===ERR===')
		}finally{
			console.log(res)
		}
	}
})

client.login(token);