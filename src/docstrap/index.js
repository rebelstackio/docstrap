(() => {
	const _options = require('./options');
	const { writeTemplate } = require('../lib');

	function docstrap(program) {
		const commandObject = program
		.description('create documentation webview in a dir, or docs/ if no dir supplied')
		.usage('docstrap [ -d | --dir=<path>] [<args>]');

		_options.forEach(option => {
			commandObject.option(...option.command);
		});

		commandObject.action((dir) => {
			if (commandObject.dir) {
				writeTemplate(commandObject.dir)
			} else {
				writeTemplate('docs/')
			}
			process.exit(0);
		});
	}

	module.exports = docstrap;
})();
