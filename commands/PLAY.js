	/*jshint esversion: 6 */
	//console.log('Step 300');
	module.exports.run = async (bot, message, args, Servers, botStatus) => {
		//console.log('Step 301');
		let fs = require('fs');
		//console.log('Step 302');
		let ytdl = require('ytdl-core');
		//console.log('Step 303');
		let sender = message.author;
		//console.log('Step 304');
		let input = args[0].toUpperCase();
		//console.log('Step 305');
		if(!args[1]){
			//console.log('Step 306');
			message.channel.send({embed:{
				description:'You need to provide a link!',
				color:0x2471A3
			}});
			//console.log('Step 307');
			return;
		}
		//console.log('Step 308');
		if(!(ytdl.validateURL(args[1]))){
			//console.log('Step 309');
			message.channel.send({embed:{
				description:'You didn\'t provide a valid youtube link!',
				color:0x2471A3
			}});
			//console.log('Step 310');
			return;
		}
		//console.log('Step 311');
		else{
			//console.log('Step 312');
			if(!message.member.voice.channel){
				//console.log('Step 313');
				message.channel.send({embed:{
					description:'You must be in a voice channel to play the music!',
					color:0x2471A3
				}});
				//console.log('Step 314');
				return;
			}
			//console.log('Step 315');
			if(!Servers[message.guild.id]){
				//console.log('Step 316');
				Servers[message.guild.id] = {
					queue: []
				};
				//console.log('Step 317');
			}
			//console.log('Step 318');
			//let server = Servers[message.guild.id];
			//console.log('Step 319');
			Servers[message.guild.id].queue.push(args[1]);
			//console.log('Step 320');
			//Servers[message.guild.id].queue = server.queue;
			//console.log('Step 321');
			fs.writeFile('Storage/Servers.json', JSON.stringify(Servers), (err) => {
				//console.log('Step 322');
				if(err){
					//console.log('Step 323');
					console.error(err);
				}
				//console.log('Step 324');
			});
			//console.log('Step 325');
			message.channel.send({embed:{
				description:'Song added to the queue!',
				color:0x2471A3
			}});
			//console.log('Step 326');
			function play(connection, message){
				//console.log('Step 327');
				//let server = Servers[message.guild.id];
				//console.log('Step 328');
				Servers[message.guild.id].dispatcher = connection.play(ytdl(Servers[message.guild.id].queue[0], {filter: 'audioonly'}));
				//console.log('Step 329');
				Servers[message.guild.id].queue.shift();
				//console.log('Step 330');
				message.channel.send({embed:{
					description:'Playing the song!',
					color:0x2471A3
				}});
				//console.log('Step 331');
				Servers[message.guild.id].dispatcher.on('finish', () => {
					//console.log('Step 332');
					if(Servers[message.guild.id].queue[0]){
						//console.log('Step 333');
						play(connection, message);
						//console.log('Step 334');
					}
					//console.log('Step 335');
					else {
						//console.log('Step 336');
						message.channel.send({embed:{
							description:'Leaving voice channel!',
							color:0x2471A3
						}});
						//console.log('Step 337');
						connection.disconnect();
						//console.log('Step 338');
						botStatus[781277535232458763].botstatus--;
						//console.log('Step 339');
						fs.writeFile('Storage/botStatus.json', JSON.stringify(botStatus), (err) => {
							//console.log('Step 340');
							if(err){
								//console.log('Step 341');
								console.error(err);
							}
							//console.log('Step 342');
						});
						//console.log('Step 343');
						Servers[message.guild.id] = { queue: [] };
						//console.log('Step 344');
						fs.writeFile('Storage/Servers.json', JSON.stringify(Servers), (err) => {
							//console.log('Step 345');
							if(err){
								//console.log('Step 346');
								console.error(err);
							}
							//console.log('Step 347');
						});
						//console.log('Step 348');
					}
					//console.log('Step 349');
				});
				//console.log('Step 350');
			}
			//console.log('Step 351');
			if(botStatus[781277535232458763].botstatus===0){
				//console.log('Step 352');
				message.member.voice.channel.join().then(function(connection){
					//console.log('Step 353');
					botStatus[781277535232458763].botstatus++;
					//console.log('Step 354');
					fs.writeFile('Storage/botStatus.json', JSON.stringify(botStatus), (err) => {
						//console.log('Step 355');
						if(err){
							//console.log('Step 356');
							console.error(err);
						}
						//console.log('Step 357');
					});
					//console.log('Step 358');
					play(connection, message);
					//console.log('Step 359');
					message.channel.send({embed:{
						description:'Joined the voice channel!',
						color:0x2471A3
					}});
					//console.log('Step 360');
				}).catch(error => {
					//console.log('Step 361');
					console.error(error);
				});
				//console.log('Step 362');
			}
			//console.log('Step 363');
		}
		//console.log('Step 364');
	}
	//console.log('Step 365');
	module.exports.config = {
		command:'PLAY'
	}
