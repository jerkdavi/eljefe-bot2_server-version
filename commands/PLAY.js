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
		if(!message.member.voice.channel){
			//console.log('Step 312');
			message.channel.send({embed:{
				description:'You must be in a voice channel to play the music!',
				color:0x2471A3
			}});
			//console.log('Step 313');
			return;
		}
		//console.log('Step 314');
		if(!Servers[message.guild.id]){
			//console.log('Step 315');
			Servers[message.guild.id] = {
				queue: []
			};
			//console.log('Step 316');
		}
		//console.log('Step 317');
		//let server = Servers[message.guild.id];
		//console.log('Step 318');
		Servers[message.guild.id].queue.push(args[1]);
		//console.log('Step 319');
		//Servers[message.guild.id].queue += args[1];
		//console.log('Step 320');
		/*Servers[message.guild.id] = {
			queue: args[1]
		};*/
		//console.log('Step 321');
		//Servers[message.guild.id].queue = server.queue;
		//console.log('Step 322');
		fs.writeFile('Storage/Servers.json', JSON.stringify(Servers), (err) => {
			//console.log('Step 323');
			if(err){
				//console.log('Step 324');
				console.error(err);
			}
			//console.log('Step 325');
		});
		//console.log('Step 326');
		message.channel.send({embed:{
			description:'Song added to the queue!',
			color:0x2471A3
		}});
		//console.log('Step 327');
		function play(connection, message){
			//console.log('Step 328');
			//let server = Servers[message.guild.id];
			//console.log('Step 329');
			Servers[message.guild.id].dispatcher = connection.play(ytdl(Servers[message.guild.id].queue[0], {filter: 'audioonly'}));
			//console.log('Step 330');
			Servers[message.guild.id].queue.shift();
			//console.log('Step 331');
			message.channel.send({embed:{
				description:'Playing the song!',
				color:0x2471A3
			}});
			//console.log('Step 332');
			Servers[message.guild.id].dispatcher.on('finish', () => {
				//console.log('Step 333');
				if(!Servers[message.guild.id].queue[0]){
					//console.log('Step 334');
					message.channel.send({embed:{
						description:'Leaving voice channel!',
						color:0x2471A3
					}});
					//console.log('Step 335');
					connection.disconnect();
					//console.log('Step 336');
					botStatus[781277535232458763].botstatus--;
					//console.log('Step 337');
					fs.writeFile('Storage/botStatus.json', JSON.stringify(botStatus), (err) => {
						//console.log('Step 338');
						if(err){
							//console.log('Step 339');
							console.error(err);
						}
						//console.log('Step 340');
					});
					//console.log('Step 341');
					Servers[message.guild.id] = { queue: [] };
					//console.log('Step 342');
					fs.writeFile('Storage/Servers.json', JSON.stringify(Servers), (err) => {
						//console.log('Step 343');
						if(err){
							//console.log('Step 344');
							console.error(err);
						}
						//console.log('Step 345');
					});
					//console.log('Step 346');
					return;
				}
				//console.log('Step 347');
				play(connection, message);
			});
			//console.log('Step 348');
		}
		//console.log('Step 349');
		if(botStatus[781277535232458763].botstatus === 0){
			//console.log('Step 350');
			message.member.voice.channel.join().then(function(connection){
				//console.log('Step 351');
				botStatus[781277535232458763].botstatus++;
				//console.log('Step 352');
				fs.writeFile('Storage/botStatus.json', JSON.stringify(botStatus), (err) => {
					//console.log('Step 353');
					if(err){
						//console.log('Step 354');
						console.error(err);
					}
					//console.log('Step 355');
				});
				//console.log('Step 356');
				play(connection, message);
				//console.log('Step 357');
				message.channel.send({embed:{
					description:'Joined the voice channel!',
					color:0x2471A3
				}});
				//console.log('Step 358');
			}).catch(error => {
				//console.log('Step 359');
				console.error(error);
			});
			//console.log('Step 360');
		}
		//console.log('Step 361');
	}
	//console.log('Step 362');
	module.exports.config = {
		command:'PLAY'
	}
