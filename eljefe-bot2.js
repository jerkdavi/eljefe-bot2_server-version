	/*jshint esversion: 6 */

	var Discord = require('discord.js');
	var ytdl = require('ytdl-core');
	var bot = new Discord.Client();

	var prefix = process.env.prefix;
	var owner = process.env.ownerID;

	var swearword;

	var servers = {};
	var server;
	var joinstatus='waiting';

	bot.on('ready', function(ready){
		console.log(`Logged in as ${bot.user.tag}!`);
		bot.user.setStatus('Online');
	});

	bot.on('message', function(message){
		var sender = message.author;
		var args = message.content.toString().split(' ');
		var input = args[0].toUpperCase();
		if(input === prefix + 'PLAY'){
			
			console.log('args[0]: '+args[0]);
			console.log('args[1]: '+args[1]);
			if(!args[1]){
				message.channel.send('You need to provide a link!');
				return;
			}
			if(!message.member.voice.channel){
				message.channel.send('You must be in a voice channel to play the music!');
				return;
			}

			if(!servers[message.guild.id]){
				servers[message.guild.id] = {
					queue: []
					};
				console.log('Queue created!');
			}
			server = servers[message.guild.id];
			server.queue.push(args[1]);
			console.log('Queue push passed!');

			function play(connection, message){
				server = servers[message.guild.id];
				server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}));
				server.queue.shift();
				console.log('Queue shift passed!');

				server.dispatcher.on('finish', () => {
					if(server.queue[0]){
						play(connection, message);
						console.log('If passed!');
					} else {
						connection.disconnect();
						console.log('Else passed!');
						joinstatus='waiting';
						servers[message.guild.id] = '';
					}
				});
			}

			if(joinstatus==='joined'){
				console.log('I\'m already in the voice channel!');
			}

			else{
				message.member.voice.channel.join().then(function(connection){
					play(connection, message);
					console.log('Joined the voice channel!');
					joinstatus='joined';
				});
			}
		}

		if(input === prefix + 'SKIP'){
			if(joinstatus==='joined'){
				server = servers[message.guild.id];
				if(server.dispatcher){
					server.dispatcher.end();
				}
				message.channel.send('Skipping the song!');
				console.log('Skipped the queue!');
			}
			else{
				message.channel.send('There are no songs! What are you skipping?');
				console.log('There are no songs! What are you skipping?');
				return;
			}
		}

		if(input === prefix + 'STOP'){
			if(joinstatus==='joined'){
				server = servers[message.guild.id];
				server.dispatcher.end();
				message.channel.send('Ending the queue. Leaving the voice channel!');
				console.log('Stopped the queue!');
			}
			else{
				message.channel.send('There are no songs! What are you stoping?');
				console.log('There are no songs! What are you stoping?');
				return;
			}
		}
	});

	bot.login(process.env.DISCORD_TOKEN);
