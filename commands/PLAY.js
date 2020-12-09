	/*jshint esversion: 6 */

	var ytdl = require('ytdl-core');

	module.exports.run = async (bot, message, args, servers, server, joinstatus) => {
		var sender = message.author;
		var args = message.content.toString().split(' ');
		var input = args[0].toUpperCase();
		
		if(!args[1]){
			message.channel.send({embed:{
				description:'You need to provide a link!',
				color:0x2471A3
			}});
			return;
		}
		if(!(ytdl.validateURL(args[1]))){
			message.channel.send({embed:{
				description:'You didn\'t provide a valid youtube link!',
				color:0x2471A3
			}});
			return;
		}
		else{
			if(!message.member.voice.channel){
				message.channel.send({embed:{
					description:'You must be in a voice channel to play the music!',
					color:0x2471A3
				}});
				return;
			}
			if(!servers[message.guild.id]){
				servers[message.guild.id] = {
					queue: []
				};
			}

			server = servers[message.guild.id];
			server.queue.push(args[1]);
				message.channel.send({embed:{
				description:'Song added to the queue!',
				color:0x2471A3
			}});

			function play(connection, message){

				server = servers[message.guild.id];
				server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}));
				server.queue.shift();

				message.channel.send({embed:{
					description:'Playing the song!',
					color:0x2471A3
				}});

				server.dispatcher.on('finish', () => {
					if(server.queue[0]){
						play(connection, message);
					} else {
						connection.disconnect();
						joinstatus='waiting';
						console.log('Play-Else; joinstatus='+joinstatus);
						servers[message.guild.id] = '';
					}
				});
				console.log('Play1; joinstatus='+joinstatus);
				console.log('Play; returning servers, server and joinstatus');
				return servers, server, joinstatus;
			}

			if(joinstatus==='waiting'){
				message.member.voice.channel.join().then(function(connection){
					joinstatus='joined';
					console.log('Play2; joinstatus='+joinstatus);
					play(connection, message);
					message.channel.send({embed:{
						description:'Joined the voice channel!',
						color:0x2471A3
					}});
				});
				console.log('Play3; joinstatus='+joinstatus);
				console.log('Play; returning joinstatus');
				return joinstatus;
			}
		}
	}
	module.exports.config = {
		command:'PLAY'
	}
