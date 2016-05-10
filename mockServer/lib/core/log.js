var L = {};
module.exports = L;

var chalk = require("chalk");

//@TODO leave it later
L.log = function() {
	return console.log.apply(console.log, arguments);
}

L.info = function() {
	return console.log(chalk.blue.apply(chalk.blue, arguments));
}

L.warn = function() {
	return console.log(chalk.yellow.apply(chalk.yellow, arguments));
}

L.error = function() {
	return console.log(chalk.red.apply(chalk.red, arguments));
}