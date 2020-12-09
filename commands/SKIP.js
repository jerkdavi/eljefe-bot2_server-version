	/*jshint esversion: 6 */

	var server;

	module.exports.run = async (bot, message, args, servers, server, joinstatus) => {
		if(joinstatus==='joined'){
			console.log('Skip; joinstatus===joined');
			server = servers[message.guild.id];
			server.dispatcher.end();
			message.channel.send({embed:{
				description:'Skipping the song!',
				color:0x2471A3
			}});
			console.log('Skip; returning server');
			return server;
		}
		else{
			console.log('Skip; joinstatus===waiting');
			message.channel.send({embed:{
				description:'There is nothing to skip!',
				color:0x2471A3
			}});
			return;
		}
	}
	module.exports.config = {
		command:'SKIP'
	}
