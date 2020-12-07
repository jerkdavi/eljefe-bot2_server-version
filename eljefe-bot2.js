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
			console.log('Sender is a bot!');
			return;
		}

		if(input === prefix + 'HELP'){
			message.channel.send({embed:{
				description:commandsList,
				color:0x2471A3
			}})
			console.log('>help');
		}
		if(input === prefix + 'COMMANDS'){
			message.channel.send({embed:{
				description:commandsList,
				color:0x2471A3
			}})
			console.log('>commands');
		}

		if(input === prefix + 'PING'){
			message.channel.send({embed:{
				description:`Ping successful! The bot ${bot.user.tag}! is online!`,
				color:0x2471A3
			}})
			console.log('>ping');
		}

		if(input === prefix + 'PLAY'){
			console.log('args[0]: '+args[0]);
			console.log('args[1]: '+args[1]);
			if(!args[1]){
				message.channel.send({embed:{
					description:'You need to provide a link!',
					color:0x2471A3
				}})
				console.log('>play ?');
				return;
			}
			if(!(ytdl.validateURL(args[1]))){
				message.channel.send({embed:{
					description:'You didn\'t provide a valid youtube link!',
					color:0x2471A3
				}})
				console.log('>play '+args[1]);
				return;
			}
			else{
				if(!message.member.voice.channel){
					message.channel.send({embed:{
						description:'You must be in a voice channel to play the music!',
						color:0x2471A3
					}})
					console.log('You must be in a voice channel to play the music!');
					return;
				}
				if(!servers[message.guild.id]){
					servers[message.guild.id] = {
						queue: []
						};
					console.log('Queue created!');
				}
				if(joinstatus==='joined'){
					console.log('I\'m already in the voice channel!');
				}
				else{
					message.member.voice.channel.join().then(function(connection){
						message.channel.send({embed:{
							description:'Joined the voice channel!',
							color:0x2471A3
						}})
						console.log('Joined the voice channel!');
						joinstatus='joined';
						play(connection, message);
					});
				}

				server = servers[message.guild.id];
				server.queue.push(args[1]);
				console.log('Queue push passed!');
				message.channel.send({embed:{
					description:'Song added to the queue!',
					color:0x2471A3
				}})
				console.log('Song added to the queue!');	

				function play(connection, message){
					server = servers[message.guild.id];
					server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}));
					server.queue.shift();
					console.log('Queue shift passed!');
					message.channel.send({embed:{
						description:'Playing the song!',
						color:0x2471A3
					}})
					console.log('Playing the song!');

					server.dispatcher.on('finish', () => {
						if(server.queue[0]){
							play(connection, message);
							console.log('If passed!');
						} else {
							message.channel.send({embed:{
								description:'Leaving the voice channel!',
								color:0x2471A3
							}})
							connection.disconnect();
							console.log('Else passed!');
							console.log('Leaving the voice channel!');
							joinstatus='waiting';
							servers[message.guild.id] = '';
						}
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
				message.channel.send({embed:{
					description:'Skipping the song!',
					color:0x2471A3
				}})
				console.log('>skip');
				console.log('Skipping the song!');
			}
			else{
				message.channel.send({embed:{
					description:'There are no songs! What are you skipping?',
					color:0x2471A3
				}})
				console.log('>skip');
				console.log('There are no songs! What are you skipping?');
				return;
			}
		}

		if(input === prefix + 'STOP'){
			if(joinstatus==='joined'){
				server = servers[message.guild.id];
				server.dispatcher.end();
				message.channel.send({embed:{
					description:'Stoping the queue!',
					color:0x2471A3
				}})
				console.log('>stop');
				console.log('Stopping the queue!');
			}
			else{
				message.channel.send({embed:{
					description:'There are no songs! What are you stoping?',
					color:0x2471A3
				}})
				console.log('>stop');
				console.log('There are no songs! What are you stoping?');
				return;
			}
		}
	});
	
	bot.on('ready', function(ready){

		console.log(`Logged in as ${bot.user.tag}!`);
		bot.user.setStatus('Online');
	});

	bot.login(process.env.DISCORD_TOKEN);
