	/*jshint esversion: 6 */
	//console.log('Step 000');
	let Discord = require('discord.js');
	//console.log('Step 001');
	let bot = new Discord.Client();
	//console.log('Step 002');
	let fs = require('fs');
	//console.log('Step 003');
	let botStatus = JSON.parse(fs.readFileSync('Storage/botStatus.json', 'utf8'));
	//console.log('Step 004');
	let Servers = JSON.parse(fs.readFileSync('Storage/Servers.json', 'utf8'));
	//console.log('Step 005');
	bot.commands = new Discord.Collection();
	//console.log('Step 006');
	fs.readdir('./commands/', (err, files) => {
		//console.log('Step 007');
		if(err){
			//console.log('Step 008');
			console.error(err);
		}
		//console.log('Step 009');
		let jsfiles = files.filter(f => f.split('.').pop() === 'js');
		//console.log('Step 010');
		if(jsfiles.length <= 0) { return /*console.log('Step 011'); */console.log('No commands found!'); }
		if(jsfiles.length > 0) { /*console.log('Step 012'); */console.log(`${jsfiles.length} commands found!`); }
		//console.log('Step 013');
		jsfiles.forEach((f, i) => {
			//console.log('Step 014');
			let cmds = require(`./commands/${f}`);
			//console.log('Step 015');
			console.log(`Command ${f} loading...`);
			//console.log('Step 016');
			bot.commands.set(cmds.config.command, cmds);
			//console.log('Step 017');
		});
		//console.log('Step 018');
	});
	//console.log('Step 019');
	let prefix = process.env.prefix;
	//console.log('Step 020');
	let owner = process.env.ownerID;
	//console.log('Step 021');
	bot.on('message', function(message){
		//console.log('Step 022');
		let sender = message.author;
		//console.log('Step 023');
		if((sender.id === '781250071215472640') || (sender.id === '781277535232458763') || (sender.id === '786892385682194442')){
			//console.log('Step 024');
			return;
		}
		//console.log('Step 025');
		if(!botStatus[781277535232458763]){
			//console.log('Step 026');
			botStatus[781277535232458763] = {
			botstatus: 0 };
			//console.log('Step 027');
		}
		//console.log('Step 028');
		if(!message.content.startsWith(prefix)){
			//console.log('Step 029');
			return;
		}
		//console.log('Step 030');
		let args = message.content.toString().split(' ');
		//console.log('Step 031');
		let input = args[0].toUpperCase();
		//console.log('Step 032');
		let cont = input.slice(prefix.length).split(' ');
		//console.log('Step 033');
		//let args = cont.slice(1);
		let cmd = bot.commands.get(cont[0]);
		//console.log('Step 034');
		if(!cmd) {
			//console.log('Step 035');
			return;
		}
		//console.log('Step 036');
		cmd.run(bot, message, args, Servers, botStatus);
		//console.log('Step 037');
	});
	//console.log('Step 038');
	bot.on('ready', function(ready){
		//console.log('Step 039');
		console.log(`Logged in as ${bot.user.tag}!`);
		//console.log('Step 040');
		bot.user.setStatus('Online');
		//console.log('Step 041');
	});
	//console.log('Step 042');
	bot.login(process.env.DISCORD_TOKEN);
	//console.log('Step 043');
