	/*jshint esversion: 6 */

	module.exports.run = async (bot, message, args, servers, server, botStatus) => {
		//console.log('Step 301');
		let ytdl = require('ytdl-core');
		//console.log('Step 302');
		let sender = message.author;
		//console.log('Step 303');
		let input = args[0].toUpperCase();
		//console.log('Step 304');
		
		if(!args[1]){
			//console.log('Step 305');
			message.channel.send({embed:{
				description:'You need to provide a link!',
				color:0x2471A3
			}});
			return;
		}
		if(!(ytdl.validateURL(args[1]))){
			//console.log('Step 306');
			message.channel.send({embed:{
				description:'You didn\'t provide a valid youtube link!',
				color:0x2471A3
			}});
			return;
		}
		else{
			if(!message.member.voice.channel){
				//console.log('Step 307');
				message.channel.send({embed:{
					description:'You must be in a voice channel to play the music!',
					color:0x2471A3
				}});
				return;
			}
			if(!servers[message.guild.id]){
				//console.log('Step 308');
				servers[message.guild.id] = {
					queue: []
				};
			}

			server = servers[message.guild.id];
			//console.log('Step 309');
			server.queue.push(args[1]);
			//console.log('Step 310');
			message.channel.send({embed:{
				description:'Song added to the queue!',
				color:0x2471A3
			}});

			function play(connection, message){
				//console.log('Step 311');
				server = servers[message.guild.id];
				//console.log('Step 312');
				server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}));
				//console.log('Step 313');
				server.queue.shift();
				//console.log('Step 314');

				message.channel.send({embed:{
					description:'Playing the song!',
					color:0x2471A3
				}});

				server.dispatcher.on('finish', () => {
					//console.log('Step 315');
					if(server.queue[0]){
						//console.log('Step 316');
						play(connection, message);
						//console.log('Step 317');
					} else {
						//console.log('Step 318');
						message.channel.send({embed:{
							description:'Leaving voice channel!',
							color:0x2471A3
						}});
						//console.log('Step 319');
						connection.disconnect();
						//console.log('Step 320');
						botStatus.botstatus--;
						//console.log('Step 321');
						servers[message.guild.id] = '';
						//console.log('Step 322');
					}
					//console.log('Step 323');
				});
				//console.log('Step 324');
			}
			//console.log('Step 325');

			if(botStatus.botstatus===0){
				//console.log('Step 326');
				message.member.voice.channel.join().then(function(connection){
					//console.log('Step 327');
					botStatus.botstatus++;
					//console.log('Step 328');
					play(connection, message);
					//console.log('Step 329');
					message.channel.send({embed:{
						description:'Joined the voice channel!',
						color:0x2471A3
					}});
				}).catch(error => {
					//console.log('Step 330');
					console.error(error);
				});
				//console.log('Step 331');
			}
			//console.log('Step 332');
		}
		//console.log('Step 333');
	}
	//console.log('Step 334');
	module.exports.config = {
		command:'PLAY'
	}
