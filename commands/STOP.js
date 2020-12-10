	/*jshint esversion: 6 */

	module.exports.run = async (bot, message, args, servers, server, botStatus) => {
		//console.log('Step 501');
		if(botStatus.botstatus===1){
			//console.log('Step 502');
			server = servers[message.guild.id];
			//console.log('Step 503');
			for(let i = server.queue.length -1; i >= 0; i--){
				//console.log('Step 504');
				server.queue.splice(i, 1);
			}
			//console.log('Step 505');
			message.channel.send({embed:{
				description:'Stopping the queue!',
				color:0x2471A3
			}});
			//console.log('Step 506');
			server.dispatcher.end();
			//console.log('Step 507');
		}
		else{
			//console.log('Step 508');
			message.channel.send({embed:{
				description:'There is nothing to stop!',
				color:0x2471A3
			}});
			return;
		}
		//console.log('Step 509');
	}
	//console.log('Step 510');
	module.exports.config = {
		command:'STOP'
	}
