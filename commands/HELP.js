	/*jshint esversion: 6 */

	module.exports.run = async (bot, message, args, servers, server, botStatus) => {
		//console.log('Step 101');
		let fs = require('fs');
		//console.log('Step 102');
		let commandsList = fs.readFileSync('Storage/commands.txt', 'utf8');
		//console.log('Step 103');

		//console.log('Step 104');
		message.channel.send({embed:{
			description:commandsList,
			color:0x2471A3
		}});
		//console.log('Step 105');
	}
	//console.log('Step 106');
	module.exports.config = {
		command:'HELP'
	}
