	/*jshint esversion: 6 */

	var Discord = require('discord.js');
	var bot = new Discord.Client();
	var fs = require('fs');
	var ytdl = require('ytdl-core');

	var commandsList = fs.readFileSync('Storage/commands.txt', 'utf8');

	var prefix = process.env.prefix;
	var owner = process.env.ownerID;

	var servers = {};
	var server;
	var joinstatus='waiting';

	bot.on('message', function(message){
		var sender = message.author;
		var args = message.content.toString().split(' ');
		var input = args[0].toUpperCase();

		if((sender.id === '781250071215472640') || (sender.id === '781277535232458763')){
			return;
		}

		if(input === prefix + 'HELP'){
			message.channel.send({embed:{
				description:commandsList,
				color:0x2471A3
			}})
		}
		if(input === prefix + 'COMMANDS'){
			message.channel.send({embed:{
				description:commandsList,
				color:0x2471A3
			}})
		}

		if(input === prefix + 'PING'){
			message.channel.send({embed:{
				description:`Ping successful! The bot ${bot.user.tag}! is online!`,
				color:0x2471A3
			}})
		}

		if(input === prefix + 'PLAY'){
			if(!args[1]){
				message.channel.send({embed:{
					description:'You need to provide a link!',
					color:0x2471A3
				}})
				return;
			}
			if(!(ytdl.validateURL(args[1]))){
				message.channel.send({embed:{
					description:'You didn\'t provide a valid youtube link!',
					color:0x2471A3
				}})
				return;
			}
			else{
				if(!message.member.voice.channel){
					message.channel.send({embed:{
						description:'You must be in a voice channel to play the music!',
						color:0x2471A3
					}})
					return;
				}
				if(!servers[message.guild.id]){
					servers[message.guild.id] = {
						queue: []
						};
				}

				server = servers[message.guild.id];
				server.queue.push(args[1]);

				function play(connection, message){
					server = servers[message.guild.id];
					server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}));
					server.queue.shift();

					server.dispatcher.on('finish', () => {
						if(server.queue[0]){
							play(connection, message);
						} else {
							connection.disconnect();
							joinstatus='waiting';
							servers[message.guild.id] = '';
						}
					});
				}

				if(joinstatus==='waiting'){
					message.member.voice.channel.join().then(function(connection){
						joinstatus='joined';
						play(connection, message);
					});
				}
			}
		}

		if(input === prefix + 'SKIP'){
			if(joinstatus==='joined'){
				server = servers[message.guild.id];
				if(server.dispatcher){
					server.dispatcher.end();
				}
			}
			else{
				return;
			}
		}

		if(input === prefix + 'STOP'){
			if(joinstatus==='joined'){
				server = servers[message.guild.id];
				server.dispatcher.end();
			}
			else{
				return;
			}
		}
	});
	
	bot.on('ready', function(ready){

		console.log(`Logged in as ${bot.user.tag}!`);
		bot.user.setStatus('Online');
	});

	bot.login(process.env.DISCORD_TOKEN);
