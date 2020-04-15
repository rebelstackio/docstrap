(() => {
	const fs = require('fs-extra');
	const current = process.cwd();
	const libTemplate = __dirname.slice(0,-3);

	function writeTemplate (dir, callback) {
		if(fs.existsSync(dir)) {
			console.log('path exist, do you want to override?');
			//TODO:
		} else {
			console.log('new path in =>', current + '/' + dir);
			try {
				fs.mkdirSync(current + '/' + dir);
				fs.copySync(libTemplate + 'template', current + '/' + dir)
				console.log('success')
			} catch (err) {
				console.error('error writing the template => ', err);
			}
		}
	}

	module.exports = { writeTemplate }
})();
