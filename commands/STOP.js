	/*jshint esversion: 6 */
	//console.log('Step 500');
	module.exports.run = async (bot, message, args, Servers, botStatus) => {
		//console.log('Step 501');
		let fs = require('fs');
		//console.log('Step 502');
		if(botStatus[781277535232458763].botstatus===1){
			//console.log('Step 503');
			//let server = Servers[message.guild.id];
			//console.log('Step 504');
			/*for(let i = Servers[message.guild.id].queue.length -1; i >= 0; i--){
				//console.log('Step 505');
				Servers[message.guild.id].queue.splice(i, 1);
			}*/
			//console.log('Step 506');
			Servers[message.guild.id].dispatcher.end();
			//console.log('Step 507');
			Servers[message.guild.id] = { queue: [] };
			//console.log('Step 508');
			//Servers[message.guild.id].queue = server.queue;
			fs.writeFile('Storage/Servers.json', JSON.stringify(Servers), (err) => {
				//console.log('Step 509');
				if(err){
					//console.log('Step 510');
					console.error(err);
				}
				//console.log('Step 511');
			});
			//console.log('Step 512');
			message.channel.send({embed:{
				description:'Stopping the queue!',
				color:0x2471A3
			}});
			//console.log('Step 513');
		}
		//console.log('Step 514');
		else{
			//console.log('Step 515');
			message.channel.send({embed:{
				description:'There is nothing to stop!',
				color:0x2471A3
			}});
			//console.log('Step 516');
			return;
		}
		//console.log('Step 517');
	}
	//console.log('Step 518');
	module.exports.config = {
		command:'STOP'
	}
