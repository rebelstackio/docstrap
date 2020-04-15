(() => {
	const _options = require('./options');
	const { writeTemplate } = require('../lib');

	function docstrap(program) {
		const commandObject = program
		.description('create documentation webview in a dir, or docs/ if no dir supplied')
		.usage('[dir]');

		_options.forEach(option => {
			commandObject.option(...option.command);
		});

		commandObject.action((dir) => {
			//console.log('start action');
			if (commandObject.dir) {
				//console.log('with dir =>', commandObject.dir)
				writeTemplate(commandObject.dir, () => {

				})
			} else {
				writeTemplate('docs/', () => {

				})
				//console.log('default docs folder')
			}
			process.exit(0);
		});
	}

	module.exports = docstrap;
})();
