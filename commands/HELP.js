	/*jshint esversion: 6 */

	var fs = require('fs');
	var commandsList = fs.readFileSync('Storage/commands.txt', 'utf8');

	module.exports.run = async (bot, message, args, servers, server, joinstatus) => {
		message.channel.send({embed:{
			description:commandsList,
			color:0x2471A3
		}});
	}
	module.exports.config = {
		command:'HELP'
	}
