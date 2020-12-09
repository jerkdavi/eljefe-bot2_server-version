	/*jshint esversion: 6 */

	var server;

	module.exports.run = async (bot, message, args, servers, server, joinstatus) => {
		if(joinstatus==='joined'){
			server = servers[message.guild.id];
			for(var i = server.queue.length -1; i >= 0; i--){
				server.queue.splice(i, 1);
			}
			message.channel.send({embed:{
				description:'Stopping the queue!',
				color:0x2471A3
			}});
			server.dispatcher.end();
			console.log('Stop; returning server');
			return server;
		}
		else{
			message.channel.send({embed:{
				description:'There is nothing to stop!',
				color:0x2471A3
			}});
			return;
		}
	}
	module.exports.config = {
		command:'STOP'
	}
