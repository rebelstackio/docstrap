(() => {
	const fs = require('fs-extra');
	const path = require('path');

	function parseConfigToHTML(htmlSTR, config, callback) {
		const varMatch = htmlSTR.match(new RegExp('(?<=\{\{).+?(?=\}\})','g'));
		let resp = htmlSTR;
		varMatch.forEach((_v) => {
			let value = config[_v];
			if(typeof value === 'object') {
				value = value.join('');
			}
			resp = resp.replace(new RegExp(`\{\{${_v}\}\}`, 'g'), value)
		});
		callback(resp)
	}

	/**
	 * Look a file by starting point
	 * @param {String} startPath
	 * @param {RegExp} filter
	 * @param {CallableFunction} callback
	 */
	function fromDir(startPath,filter,callback){
		if (!fs.existsSync(startPath)){
			//console.log("#>" + error('no dir ' + startPath));
			return;
		}
		let files=fs.readdirSync(startPath);
		for(let i=0;i<files.length;i++){
			let filename=path.join(startPath,files[i]);
			let stat = fs.lstatSync(filename);
			if (stat.isDirectory()){
				fromDir(filename,filter,callback); //recurse
			}
			else if (filter.test(filename)) callback(filename);
		}
	}

	module.exports = { parseConfigToHTML, fromDir }
})();
