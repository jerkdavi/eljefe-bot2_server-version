	/*jshint esversion: 6 */

	module.exports.run = async (bot, message, args, servers, server, joinstatus) => {
		message.channel.send({embed:{
			description:`Ping successful! The bot ${bot.user.tag}! is online!`,
			color:0x2471A3
		}});
	}
	module.exports.config = {
		command:'PING'
	}
