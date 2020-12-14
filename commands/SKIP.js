	/*jshint esversion: 6 */
	//console.log('Step 400');
	module.exports.run = async (bot, message, args, Servers, botStatus) => {
		//console.log('Step 401');
		if(botStatus[781277535232458763].botstatus===0){
			//console.log('Step 402');
			message.channel.send({embed:{
				description:'There is nothing to skip!',
				color:0x2471A3
			}});
			//console.log('Step 403');
			return;
		}
		//console.log('Step 404');
		//let server = Servers[message.guild.id];
		//console.log('Step 405');
		Servers[message.guild.id].dispatcher.end();
		//console.log('Step 406');
		message.channel.send({embed:{
			description:'Skipping the song!',
			color:0x2471A3
		}});
		//console.log('Step 407');
	}
	//console.log('Step 408');
	module.exports.config = {
		command:'SKIP'
	}
