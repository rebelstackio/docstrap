(() => {
	function parseConfigToHTML(htmlSTR, config, callback) {
		const varMatch = htmlSTR.match(new RegExp('(?<=\{\{).+?(?=\}\})','g'));
		let resp = htmlSTR;
		varMatch.forEach((_v) => {
			let value = config[_v];
			console.log(typeof value)
			if(typeof value === 'object') {
				value = value.join('');
			}
			resp = resp.replace(new RegExp(`\{\{${_v}\}\}`, 'g'), value)
		});
		callback(resp)
	}

	module.exports = { parseConfigToHTML }
})();
