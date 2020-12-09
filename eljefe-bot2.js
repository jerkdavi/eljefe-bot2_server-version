	/*jshint esversion: 6 */

	var Discord = require('discord.js');
	var bot = new Discord.Client();
	var fs = require('fs');

	bot.commands = new Discord.Collection();

	var servers = {};
	var server;
	var joinstatus='waiting';
	
	fs.readdir('./commands/', (err, files) => {
		if(err){
			console.error(err);
		}
			
		var jsfiles = files.filter(f => f.split('.').pop() === 'js');
		if(jsfiles.length <= 0) { return console.log('No commands found!'); }
		else { console.log(jsfiles.length + ' commands found!'); }
		
		jsfiles.forEach((f, i) => {
			var cmds = require(`./commands/${f}`);
			console.log(`Command ${f} loading...`);
			bot.commands.set(cmds.config.command, cmds);
		});
		
	});

	var prefix = process.env.prefix;
	var owner = process.env.ownerID;

	bot.on('message', function(message){
		var sender = message.author;
		var args = message.content.toString().split(' ');
		var input = args[0].toUpperCase();

		if((sender.id === '781250071215472640') || (sender.id === '781277535232458763')){
			return;
		}

		if(input.startsWith(prefix)){

			var cont = input.slice(prefix.length).split(' ');
			var args = cont.slice(1);
			var cmd = bot.commands.get(cont[0]);

			if(cmd) {
				cmd.run(bot, message, args);
			}
			else{
				//console.log('Error! Else passed!');
				return;
			}
		}
		else{
			return;
		}
	});

	bot.on('ready', function(ready){

		console.log(`Logged in as ${bot.user.tag}!`);
		bot.user.setStatus('Online');
	});

	bot.login(process.env.DISCORD_TOKEN);
