	/*jshint esversion: 6 */

	module.exports.run = async (bot, message, args, servers, server, botStatus) => {
		//console.log('Step 401');
		if(botStatus.botstatus===1){
			//console.log('Step 402');
			server = servers[message.guild.id];
			//console.log('Step 403');
			server.dispatcher.end();
			//console.log('Step 404');
			message.channel.send({embed:{
				description:'Skipping the song!',
				color:0x2471A3
			}});
			//console.log('Step 405');
		}
		else{
			//console.log('Step 407');
			message.channel.send({embed:{
				description:'There is nothing to skip!',
				color:0x2471A3
			}});
			//console.log('Step 408');
			return;
		}
		//console.log('Step 409');
	}
	//console.log('Step 410');
	module.exports.config = {
		command:'SKIP'
	}
