(() => {
	const fs = require('fs-extra');
	const _currenBase = process.cwd();
	const _libBase = __dirname.slice(0,-3);

	function writeTemplate (dir, callback) {
		if(fs.existsSync(dir)) {
			console.log('path exist, .MD files won\'t be override');
			//TODO: override
			try {
				fs.copySync(_libBase + 'template', _currenBase + '/' + dir, {filter: (path) => {
					if(path.match(new RegExp('\.(md)$')) !== null) {
						return false;
					}
					return false;
				}});
			} catch (err) {
				console.log('Error writing template => ', err);
			}
		} else {
			console.log('new path in =>', _currenBase + '/' + dir);
			try {
				fs.mkdirSync(_currenBase + '/' + dir);
				fs.copySync(_libBase + 'template', _currenBase + '/' + dir);
			} catch (err) {
				console.error('error writing the template => ', err);
			}
		}
	}
	module.exports = { writeTemplate }
})();
