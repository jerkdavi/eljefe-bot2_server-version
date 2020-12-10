	/*jshint esversion: 6 */
	//console.log('Step 100');
	module.exports.run = async (bot, message, args, Servers, botStatus) => {
		//console.log('Step 101');
		let fs = require('fs');
		//console.log('Step 102');
		let commandsList = fs.readFileSync('Storage/commands.txt', 'utf8');
		//console.log('Step 103');
		message.channel.send({embed:{
			description:commandsList,
			color:0x2471A3
		}});
		//console.log('Step 104');
	}
	//console.log('Step 105');
	module.exports.config = {
		command:'HELP'
	}
