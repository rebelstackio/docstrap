(() => {
	const fs = require('fs-extra');
	const _currenBase = process.cwd();
	const _libBase = __dirname.slice(0,-3);
	const { parseConfigToHTML, fromDir } = require('../utils');
	const showdown = require('showdown');

	function writeTemplate (dir, callback) {
		if(fs.existsSync(dir)) {
			console.log('path exist, .MD files won\'t be override');
			try {
				fs.copySync(_libBase + 'template', _currenBase + '/' + dir, {filter: (path) => {
					if(path.match(new RegExp('\.(md)$')) !== null) {
						return false;
					}
					return true;
				}});
				_fillTemplate(dir);
			} catch (err) {
				console.log('Error writing template => ', err);
			}
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
		fromDir(_currenBase + '/' + dir + '/', new RegExp('\.(html)$'),
		(fn) => {
			const _htmlView = fs.readFileSync(fn, 'utf8')
			const newHTML = parseConfigToHTML(_htmlView, _config)
			fs.writeFileSync(fn, newHTML)
		});
		fromDir(_currenBase + '/' + dir + '/', new RegExp('\.(md)$'),
		(mdPath) => {
			const _baseMd = mdPath.replace(new RegExp('[^\\/*]+$', 'g'), '');
			if(fs.existsSync(_baseMd + 'index.html')) {
				const mdcontent = _getMDToHTML(mdPath);
				const _htmlView = fs.readFileSync(_baseMd + 'index.html', 'utf8');
				const newHTML = parseConfigToHTML(_htmlView, {mdcontent});
				fs.writeFileSync(_baseMd + 'index.html', newHTML)
			}
		});
	}

	function _getMDToHTML(dir) {
		try {
			const mdfile = fs.readFileSync(dir, 'utf8');
			const converter = new showdown.Converter()
			return converter.makeHtml(mdfile);
		} catch (err) {
			console.error('Error to parse MD file', err)
			return ''
		}
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
