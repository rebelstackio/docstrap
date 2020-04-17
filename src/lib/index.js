(() => {
	const fs = require('fs-extra');
	const _currenBase = process.cwd();
	const _libBase = __dirname.slice(0,-3);
	const { parseConfigToHTML } = require('../utils');

	function writeTemplate (dir, callback) {
		if(fs.existsSync(dir)) {
			console.log('path exist, do you want to override?');
			//TODO: Make override options
		} else {
			console.log('new path in =>', _currenBase + '/' + dir);
			try {
				fs.mkdirSync(_currenBase + '/' + dir);
				fs.copySync(_libBase + 'template', _currenBase + '/' + dir);
				_fillTemplate(dir);
			} catch (err) {
				console.error('error writing the template => ', err);
			}
		}
	}
	/**
	 * fill the template with the project info
	 * @param {String} dir docs directory
	 */
	function _fillTemplate(dir) {
		const _config = getConfigFile();
		const _homeView = fs.readFileSync(_currenBase + '/' + dir + '/index.html', 'utf8');
		parseConfigToHTML(_homeView, _config, (newHTML) => {
			//console.log(newHTML);
			fs.writeFileSync(_currenBase + '/' + dir + '/index.html', newHTML)
		});
	}
	/**
	 * get Docstrap config file, if it doesn't exist return a default one
	 */
	function getConfigFile() {
		if(fs.existsSync(_currenBase + '/.docstrap.js')) {
			return require(_currenBase + '/.docstrap.js').default;
		}
		return require(_libBase + 'lib/default-config.js').default;
	}

	module.exports = { writeTemplate }
})();
