	/*jshint esversion: 6 */

	//const { prefix,	version, token } = require('./config.json');
	//console.log('Prefix: '+prefix);
	//console.log('Version: '+version);
	//console.log('Token: '+token);
	var prefix = process.env.prefix;
	const {
		Client,
		Attachment
	} = require('discord.js');

	const bot = new Client ();
	//console.log('Client: '+Client);
	const ytdl = require('ytdl-core');
	//console.log('ytdl: '+ytdl);

	var servers = {};
	var server;
	var joinstatus='waiting';

	//bot.on('ready', () => {
	bot.on('ready', function(ready){
		console.log('This bot is online! '+version);
	});

	//bot.on('message', message => {
	bot.on('message', function(message){
		let args = message.content.substring(prefix.length).split(' ');
		switch(args[0]){

			case 'play':
				if(!args[1]){
					message.channel.send('You need to provide a link!');
					console.log('You need to provide a link!');
					//console.log('args[0]: '+args[0]);
					//console.log('args[1]: '+args[1]);
					return;
				}
				if(!message.member.voice.channel){
					message.channel.send('You must be in a voice channel to play the music!');
					console.log('You must be in a voice channel to play the music!');
					return;
				}
				if(!servers[message.guild.id]){
					servers[message.guild.id] = {
						queue: []
					};
					console.log('Queue created!');
				}
				//console.log('args[0]: '+args[0]);
				//console.log('args[1]: '+args[1]);
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
			break;

			case 'skip':
				if(joinstatus==='joined'){
					server = servers[message.guild.id];
					if(server.dispatcher) server.dispatcher.end();
					message.channel.send('Skipping the song!');
					console.log('Skipped the queue!');
				} else{
					message.channel.send('There are no songs! What are you skipping?');
					console.log('There are no songs! What are you skipping?');
					return;
				}
			break;

			case 'stop':
				if(joinstatus==='joined'){
					server = servers[message.guild.id];
					server.dispatcher.end();
					message.channel.send('Ending the queue. Leaving the voice channel!');
					console.log('Stopped the queue!');
				} else{
					message.channel.send('There are no songs! What are you stoping?');
					console.log('There are no songs! What are you stoping?');
					return;
				}
			break;
		}
	});

	bot.login(process.env.DISCORD_TOKEN);
