	/*jshint esversion: 6 */
	//console.log('Step 200');
	module.exports.run = async (bot, message, args, Servers, botStatus) => {
		//console.log('Step 201');
		message.channel.send({embed:{
			description:`Ping successful! The bot ${bot.user.tag}! is online!`,
			color:0x2471A3
		}});
		//console.log('Step 202');
	}
	//console.log('Step 203');
	module.exports.config = {
		command:'PING'
	}
